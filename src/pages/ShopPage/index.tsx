import React from 'react'

import styles from './ShopPage.module.sass'

import SuitModel from '../../assets/img/pages/shop/SuitModel.png'
import { Button, ButtonType } from 'components/ui/Button'
import { NavLink } from 'react-router-dom'
import { ProductCard } from 'components/ui/ProductCard'
import { PublishedWearService } from 'generated/api'
import { RootState, useAppDispatch } from 'redux/store'
import { setWearCount, setWears } from 'redux/wears/slice'
import { useSelector } from 'react-redux'
import { ProductSkeleton } from 'components/ui/ProductCard/Skeleton'
import { Pagination } from 'components/ui/Pagination'
import { setCurrentShopPage, setCurrentShopCategory } from 'redux/filters/slice'
import { FilterButton } from 'components/ui/FilterButton'
import { requestIncludeResponseHeaders } from 'generated/api/core/requestIncludeResponseHeaders'


export const ShopPage = () => {
  const dispatch = useAppDispatch()
  const wears = useSelector((state: RootState) => state.wears.wears)
  const [isLoading, setLoading] = React.useState(false)

  const currentPage = useSelector((state: RootState) => state.filters.currentShopPage)
  const currentCategory = useSelector((state: RootState) => state.filters.currentShopCategory)
  const categories = useSelector((state: RootState) => state.filters.categories)
  const wearsCount = useSelector((state: RootState) => state.wears.wearCount)

  const onChangePage = (page: number) => {
    dispatch(setCurrentShopPage(page));
  };

  const onChangeCategory = (category: string) => {
    dispatch(setCurrentShopCategory(category));
    dispatch(setCurrentShopPage(1));
  };

  React.useEffect(() => {
    setLoading(true)
    requestIncludeResponseHeaders(async () => {
      return await PublishedWearService.getApiWears(currentPage, 6, currentCategory === 'All' ? '' : currentCategory)
    })
    .then(resp => {
      console.log(resp);
      dispatch(setWears(resp.body))
      console.log(resp.headers.get('X-Total-Count'))
      dispatch(setWearCount(parseInt(resp.headers.get('X-Total-Count') as string)))
      setLoading(false)
    })
  }, [currentPage, currentCategory, categories])

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
        <FilterButton categories={categories} selectedValue={currentCategory} onChangeFilter={(i: string) => onChangeCategory(i)} />
        </div>
        <div className={styles.products}>
            {!isLoading 
            ? wears.map((item, i) => <ProductCard key={i} product={item}/>) 
            : [...new Array(6)].map((_,i) => <ProductSkeleton key={i} />)}
        </div>
        <Pagination currentPage={currentPage} onChangePage={onChangePage} pageCount={Math.ceil(wearsCount / 6)}/>
    </div>
    </div>
  )
}
