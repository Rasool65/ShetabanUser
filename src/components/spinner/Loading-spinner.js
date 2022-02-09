import loading from '@src/assets/images/shetaban/loading.gif'

const ComponentSpinner = () => {
  return (
    <div className='fallback-spinner'>
       <img src={loading} alt='loading' style={{width:'120px'}} /> 
    </div>
  )
}

export default ComponentSpinner
