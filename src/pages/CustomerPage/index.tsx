import React from 'react'

import styles from './CustomerPage.module.sass'
import { ProductCard } from 'components/ui/ProductCard'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'redux/store'
import { setOrderCount, setOrders, setUser } from 'redux/user/slice'

import Logout from 'assets/img/pages/profile/Logout.svg'
import { OrderModel, OrderService, OrderStatus } from 'generated/api'
import { ProductSkeleton } from 'components/ui/ProductCard/Skeleton'
import { requestIncludeResponseHeaders } from 'generated/api/core/requestIncludeResponseHeaders'
import { FilterButton } from 'components/ui/FilterButton'
import { Pagination } from 'components/ui/Pagination'
import { setCurrentProfileCategory, setCurrentProfilePage } from 'redux/filters/slice'

const skipAndTake = <T,>(array: Array<T> | null | undefined, skipItemCount: number, takeItemCount: number) => {
  if(array) return array.slice(skipItemCount, skipItemCount + takeItemCount)
  return []
}

export const CustomerPage = () => {
  const [selectedCategory, setCategory] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)
  const user = useSelector((state: RootState) => state.user.user)
  const orders = useSelector((state: RootState) => state.user.orders)
  const ordersCount = useSelector((state: RootState) => state.user.orderCount)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const currentPage = useSelector((state: RootState) => state.filters.currentShopPage)
  const currentFilter = useSelector((state: RootState) => state.filters.currentShopCategory)
  const categories = useSelector((state: RootState) => state.filters.categories)

  const onChangePage = (page: number) => {
    dispatch(setCurrentProfilePage(page));
  };

  const onChangeFilter = (category: string) => {
    dispatch(setCurrentProfileCategory(category));
    dispatch(setCurrentProfilePage(1));
  };

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
      return await OrderService.getApiOrders(currentPage, 6, currentFilter)
    })
    .then(resp => {
      dispatch(setOrders(resp.body))
      dispatch(setOrderCount(parseInt(resp.headers.get('X-Total-Count') as string)))
      setIsLoading(false)
    })
  }, [user, currentPage, currentFilter, categories, selectedCategory])

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
          <div className={styles.topPanel}>
              <nav className={styles.navigation}>
                  <div onClick={() => selectCategory(0)} className={ selectedCategory === 0 ? styles.active : ''}>All orders</div>
                  <div onClick={() => selectCategory(1)} className={ selectedCategory === 1 ? styles.active : ''}>Drafts</div>
                  <div onClick={() => selectCategory(2)} className={ selectedCategory === 2 ? styles.active : ''}>Ordered</div>
                  <div onClick={() => selectCategory(3)} className={ selectedCategory === 3 ? styles.active : ''}>Published</div>
              </nav>
              <FilterButton categories={categories} selectedValue={currentFilter} onChangeFilter={(i: string) => onChangeFilter(i)} />
            </div>
            <div className={styles.productsList}>
                {selectedCategory === 0 && (!isLoading ? orders.map((item, i) => <ProductCard key={i} product={item}/>) : [...new Array(6)].map((_,i) => <ProductSkeleton key={i} />))}
                {selectedCategory === 1 && (!isLoading ? orders.filter(x => x.orderStatus === OrderStatus.DRAFT).map((item, i) => <ProductCard key={i} product={item}/>) : [...new Array(6)].map((_,i) => <ProductSkeleton key={i} />))}
                {selectedCategory === 2 && (!isLoading ? orders.filter(x => x.orderStatus === OrderStatus.PLACED).map((item, i) => <ProductCard key={i} product={item}/>) : [...new Array(6)].map((_,i) => <ProductSkeleton key={i} />))}
                {selectedCategory === 3 && (!isLoading ? skipAndTake(user.publishedWears, (currentPage - 1) * 6, 6).map((item, i) => <ProductCard key={i} product={item}/>) : [...new Array(6)].map((_,i) => <ProductSkeleton key={i} />))}
            </div>
            <div className={styles.paginationBlock}>
              <Pagination currentPage={currentPage} onChangePage={onChangePage} pageCount={selectedCategory === 3 ? Math.ceil(user.publishedWears ? user.publishedWears.length / 6 : 0) : Math.ceil(ordersCount / 6)}/>
            </div>
        </div>
      </div>
  )
}
