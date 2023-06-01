import React from 'react'

import styles from './CustomerPage.module.sass'
import { ProductCard } from 'components/ui/ProductCard'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'redux/store'
import { setOrders, setUser } from 'redux/user/slice'

import Logout from 'assets/img/pages/profile/Logout.svg'
import { OrderModel, OrderService, OrderStatus, WearModel } from 'generated/api'
import { ProductSkeleton } from 'components/ui/ProductCard/Skeleton'
import { requestIncludeResponseHeaders } from 'generated/api/core/requestIncludeResponseHeaders'

export const CustomerPage = () => {
  const [selectedCategory, setCategory] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)
  const user = useSelector((state: RootState) => state.user.user)
  const orders = useSelector((state: RootState) => state.user.orders)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const selectCategory = (id: number) => {
    setCategory(id)
  }

  const handleLogout = () => {
    if(window.confirm("Really logout?")){
      dispatch(setUser({}))
      localStorage.removeItem("token")
      navigate("/")
      window.scrollTo(0,0)
    }
  }

  React.useEffect(() => {
    setIsLoading(true)
    requestIncludeResponseHeaders<OrderModel[]>(async () => {
      return await OrderService.getApiOrders()
    })
    .then(resp => {
      dispatch(setOrders(resp.body))
      console.log(resp.headers.get('X-Total-Count'))
      setIsLoading(false)
    })
  }, [user])

  const getCombinedArray = () => {
    if(user.publishedWears && orders){
      return [...new Set([...orders, ...user.publishedWears as WearModel[]])];
    }
    return []
  }

  return (
    <div className={styles.container}>
      <span className={styles.title}>User Area</span>  
      <div className={styles.info}>
        <span className={styles.infoName}>Welcome, {user.name}</span>
        <div onClick={handleLogout} className={styles.logoutIcon}>
            <img src={Logout} alt="logout"/>
          </div>
      </div>
      <div className={styles.line}></div>
        <div className={styles.products}>
            <nav className={styles.navigation}>
                <div onClick={() => selectCategory(0)} className={ selectedCategory === 0 ? styles.active : ''}>All</div>
                <div onClick={() => selectCategory(1)} className={ selectedCategory === 1 ? styles.active : ''}>Drafts</div>
                <div onClick={() => selectCategory(2)} className={ selectedCategory === 2 ? styles.active : ''}>Ordered</div>
                <div onClick={() => selectCategory(3)} className={ selectedCategory === 3 ? styles.active : ''}>Published</div>
            </nav>
            <div className={styles.productsList}>
                {selectedCategory === 0 && (!isLoading ? getCombinedArray().map((item, i) => <ProductCard key={i} product={item}/>) : [...new Array(6)].map((_,i) => <ProductSkeleton key={i} />))}
                {selectedCategory === 1 && orders.filter(x => x.orderStatus === OrderStatus.DRAFT).map((item, i) => <ProductCard key={i} product={item}/>)}
                {selectedCategory === 2 && orders.filter(x => x.orderStatus === OrderStatus.PLACED).map((item, i) => <ProductCard key={i} product={item}/>)}
                {selectedCategory === 3 && user.publishedWears?.map((item, i) => <ProductCard key={i} product={item}/>)}
            </div>
        </div>
      </div>
  )
}
