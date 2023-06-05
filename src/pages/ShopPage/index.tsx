import React from 'react'

import styles from './ShopPage.module.sass'

import SuitModel from '../../assets/img/pages/shop/SuitModel.png'
import { Button, ButtonType } from 'components/ui/Button'
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
  const [selectedCategory, setCategory] = React.useState(0)

  const currentPage = useSelector((state: RootState) => state.filters.currentShopPage)
  const currentFilter = useSelector((state: RootState) => state.filters.currentShopCategory)
  const categories = useSelector((state: RootState) => state.filters.categories)
  const wearsCount = useSelector((state: RootState) => state.wears.wearCount)

  const onChangePage = (page: number) => {
    dispatch(setCurrentShopPage(page));
  };

  const onChangeFilter = (category: string) => {
    dispatch(setCurrentShopCategory(category));
    dispatch(setCurrentShopPage(1));
  };

  const selectCategory = (id: number) => {
    setCategory(id)
  }

  React.useEffect(() => {
    setLoading(true)
    if(selectedCategory === 0) {
      PublishedWearService.getApiWearsFeatured()
      .then(resp => {
        dispatch(setWears(resp))
        dispatch(setWearCount(resp.length))
        setLoading(false)
      })
    } else {
      requestIncludeResponseHeaders(async () => {
        return await PublishedWearService.getApiWears(currentPage, 6, currentFilter === 'All' ? '' : currentFilter)
      })
      .then(resp => {
        dispatch(setWears(resp.body))
        console.log(resp.headers.get('X-Total-Count'))
        dispatch(setWearCount(parseInt(resp.headers.get('X-Total-Count') as string)))
        setLoading(false)
      })
  }
  }, [currentPage, currentFilter, selectedCategory, categories])

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
            <div onClick={() => selectCategory(0)} className={ selectedCategory === 0 ? styles.active : ''}>Fresh Start</div>
            <div onClick={() => selectCategory(1)} className={ selectedCategory === 1 ? styles.active : ''}>Designs from Users</div>
        </nav>
        {selectedCategory === 1 && <FilterButton categories={categories} selectedValue={currentFilter} onChangeFilter={(i: string) => onChangeFilter(i)} />}
        </div>
        <div className={styles.products}>
            {!isLoading 
            ? wears.map((item, i) => <ProductCard key={i} product={item}/>) 
            : [...new Array(6)].map((_,i) => <ProductSkeleton key={i} />)}
        </div>
        {selectedCategory === 1 && <Pagination currentPage={currentPage} onChangePage={onChangePage} pageCount={Math.ceil(wearsCount / 6)}/>}
    </div>
    </div>
  )
}
