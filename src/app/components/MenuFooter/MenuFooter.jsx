
import { getUserInfo } from '@/app/utilities/generateToken'
import MenuFooterWrapper from './MenuFooterWrapper'

const MenuFooter = () => {
  const { username } = getUserInfo();

  return (
    <MenuFooterWrapper username={ username }/>
  )
}

export default MenuFooter