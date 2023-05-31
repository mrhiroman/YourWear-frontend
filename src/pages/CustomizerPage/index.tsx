import React from 'react'
import styles from './CustomizerPage.module.sass'
import { useSelector } from 'react-redux/es/exports'
import { RootState, useAppDispatch } from 'redux/store'
import { Button, ButtonType } from 'components/ui/Button'
import { setDesignState, setItem } from 'redux/customizer/slice'

import './EditorFix.sass'

import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from 'react-filerobot-image-editor';

import { OrderModel, OrderService, PublishedWearService, WearModel } from 'generated/api'
import { useNavigate } from 'react-router-dom'
import { isOrderModel } from 'components/ui/ProductCard'


export const CustomizerPage = () => {
  const [isLoading, setIsLoading] = React.useState(true)
  const itemToCustomize = useSelector((state: RootState) => state.customizer.itemToCustomize)
  const designState = useSelector((state: RootState) => state.customizer.designState)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const LoadImageFromBackend = () => {
    if(isOrderModel(itemToCustomize as (WearModel | OrderModel))) {
      OrderService.getApiOrdersGetobject(itemToCustomize?.id as number)
      .then(response => {
          const state = JSON.parse(response.value)
          console.log(state)
          dispatch(setDesignState(state))
      })
      .catch(err => console.log(err))
    } else {
      PublishedWearService.getApiWearsGetobject(itemToCustomize?.id as number) 
      .then(response => {
        const state = JSON.parse(response.value)
        console.log(state)
        dispatch(setDesignState(state))
    })
    .catch(err => console.log(err))
    }
  }
  
  React.useEffect(() => {
      if(itemToCustomize) LoadImageFromBackend()
  }, [itemToCustomize])

  const shopClick = () => {
    navigate("/shop")
  }

  const saveImage = (editedImageObject: any, designState: any, item?: WearModel | OrderModel) => {
    if(isOrderModel(item as (WearModel | OrderModel))){
      if((item as OrderModel).id) {
        OrderService.postApiOrdersUpdate({
          cost: (item as OrderModel).cost,
          editableObject: JSON.stringify(designState),
          imageUrl: editedImageObject.imageBase64,
          id: (item as OrderModel).id
        })
      }
    } else {
      OrderService.postApiOrders({
        clothType: item?.clothType,
        cost: 10, //add cost to wears
        editableObject: JSON.stringify(designState),
        imageUrl: editedImageObject.imageBase64
      })
    }
  
    dispatch(setItem({}))
    //dispatch(setDesignState({}))
    navigate("/profile")
  }

  if(!(itemToCustomize || designState)){
    return (
      <div className={styles.layout}>
        <h1 className={styles.caption}>Hey!</h1>
        <div className={styles.smallText}>You have not selected any item to customize...</div>
        <Button onClick={shopClick} type={ButtonType.Blue} text='Go to Shop' />
      </div>
    )
  }

  if(isLoading){
    setTimeout(() => setIsLoading(false), 1000)
    return (
      <div className={styles.layout}>
          <h1 className={styles.caption}>Wait a sec!</h1>
          <div className={styles.smallText}>The editor is loading...</div>
      </div>
    )
  }

  return (
    <div className={`${styles.layout} editorFix`}>
      <FilerobotImageEditor
          defaultSavedImageQuality={0.3}
          disableZooming={true}
          savingPixelRatio={4}
          previewPixelRatio={window.devicePixelRatio}
          //@ts-ignore
          source={designState && designState?.imgSrc}
          onBeforeSave={(editedImageObject) => {

            return false}
          }
          onSave={(editedImageObject, designState) => {
            console.log(editedImageObject, designState)
            saveImage(editedImageObject, designState, itemToCustomize)
            console.log(editedImageObject.imageBase64)
            }
          }
          onClose={() => {}}
          annotationsCommon={{
            fill: '#ff0000',
          }}
          Text={{ text: 'Customizer' }}
          Rotate={{ angle: 90, componentType: 'slider' }}
          tabsIds={[TABS.ANNOTATE]} // or {['Adjust', 'Annotate', 'Watermark']}
          defaultTabId={TABS.ANNOTATE} // or 'Annotate'
          defaultToolId={TOOLS.IMAGE} // or 'Text'
          loadableDesignState={designState}
          closeAfterSave={true}
        />
    </div>
  )
  
}
