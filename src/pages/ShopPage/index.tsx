import React from 'react'

import styles from './ShopPage.module.sass'

import SuitModel from '../../assets/img/pages/shop/SuitModel.png'
import { Button, ButtonType } from 'components/ui/Button'
import { NavLink } from 'react-router-dom'
import { Product, ProductCard } from 'components/ui/ProductCard'
import { PublishedWearService } from 'generated/api'
import { RootState, useAppDispatch } from 'redux/store'
import { setWears } from 'redux/wears/slice'
import { useSelector } from 'react-redux'
import { ProductSkeleton } from 'components/ui/ProductCard/Skeleton'
import { Pagination } from 'components/ui/Pagination'
import { setCurrentPage } from 'redux/products/slice'
import { Sort } from 'components/ui/Popup'


const MockData: Array<Product> = [
    {name: 'test', price: 500},
    {name: 'test', price: 500},
    {name: 'test', price: 500},
    {name: 'test', price: 500},
    {name: 'test', price: 500},
    {name: 'test', price: 500},
]

export const ShopPage = () => {
  const dispatch = useAppDispatch()
  const wears = useSelector((state: RootState) => state.wears.wears)
  const [isLoading, setLoading] = React.useState(false)

  // const products = useSelector((state: RootState) => state.products.products)
  const currentPage = useSelector((state: RootState) => state.products.currentPage)

   const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const [sortType, setSortType] = React.useState({
    name: 'test',
    sortProperty: 'test',
  });

  React.useEffect(() => {
    setLoading(true)
    PublishedWearService.getApiWears()
    .then(resp => {
      dispatch(setWears(resp))
      setLoading(false)
    })
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.bannerSuits}>
        <div className={styles.content}>
            <span className={styles.title}>Premium Quality</span>
            <div className={styles.line}></div>
            <span className={styles.info}>Our suits are crafted in Italy and France by latest technology
            using some of the world's finest and highest quality fabrics</span>
            <div className={styles.buttons}>
                <Button type={ButtonType.Yellow} text='Customize now' />
                <Button type={ButtonType.Blue} text='Browse suits' />
        </div>
        </div>
            <img src={SuitModel} alt="model" className={styles.poster}/>
      </div>
    <div className={styles.bannerProducts}>
        <div className={styles.navigation}>
        <nav className={styles.navigationBar}>
            <NavLink to={''} className={ ({isActive}) => isActive ? styles.active : ''}>Fresh Start</NavLink>
            <NavLink to={''} className={ ({isActive}) => isActive ? styles.active : ''}>Designs from Users</NavLink>
        </nav>
        <Sort value={sortType} onClickSort={(i) => setSortType(i)} />
        </div>
        <div className={styles.products}>
            {!isLoading 
            ? wears.map((item, i) => <ProductCard key={i} product={item}/>) 
            : [...new Array(6)].map((_,i) => <ProductSkeleton key={i} />)}
        </div>
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
    </div>
  )
}
