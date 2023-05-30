import React from 'react'
import styles from './CustomizerPage.module.sass'
import { useSelector } from 'react-redux/es/exports'
import { RootState, useAppDispatch } from 'redux/store'
import { Button, ButtonType } from 'components/ui/Button'
import { setDesignState } from 'redux/customizer/slice'

import './EditorFix.sass'

import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from 'react-filerobot-image-editor';

import { ClothType, OrderService } from 'generated/api'
import { Root } from 'react-dom/client'
import { ClothItem } from 'types/types'

const saveImage = (editedImageObject: any, designState: any, item?: ClothItem) => {
  OrderService.postApiOrders({
    clothType: item?.type, //fix with actual Item
    cost: item?.cost,
    editableObject: JSON.stringify(designState),
    imageUrl: designState.imgSrc
  })
}


export const CustomizerPage = () => {
  const [isLoading, setIsLoading] = React.useState(true)
  const itemToCustomize = useSelector((state: RootState) => state.customizer.itemToCustomize)
  const designState = useSelector((state: RootState) => state.customizer.designState)

  const dispatch = useAppDispatch();

  const LoadImageFromBackend = () => {
    OrderService.getApiOrdersGetobject(10)
    .then(response => {
        const state = JSON.parse(response.value)
        console.log(state)
        dispatch(setDesignState(state))
    })
    .catch(err => console.log(err))
  }
  
  if(!designState){
    LoadImageFromBackend()
  }

  if(!(itemToCustomize || designState)){
    return (
      <div className={styles.layout}>
        <h1 className={styles.caption}>Hey!</h1>
        <div className={styles.smallText}>You have not selected any item to customize...</div>
        <Button type={ButtonType.Blue} text='Go to Shop' />
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
          disableZooming={true}
          savingPixelRatio={4}
          previewPixelRatio={window.devicePixelRatio}
          // @ts-ignore
          source={itemToCustomize ? itemToCustomize.baseImage : designState?.imgSrc}
          onBeforeSave={(editedImageObject) => {
            console.log(editedImageObject)
            return false}
          }
          onSave={(editedImageObject, designState) => {
            console.log(editedImageObject, designState)
            saveImage(editedImageObject, designState, itemToCustomize)
            //(editedImageObject.imageBase64, 'img.png')
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
        />
    </div>
  )
  
}
