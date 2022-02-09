// ** Logo
import logo from '@src/assets/images/shetaban/logo.png'
import loading from '@src/assets/images/shetaban/loading.gif'

const SpinnerComponent = () => {
  return (
    <div className='fallback-spinner app-loader'>
      <img className='fallback-logo' src={logo} alt='logo' />
      <img src={loading} alt='loading' style={{width:'120px'}} /> 
    </div>
  )
}

export default SpinnerComponent
