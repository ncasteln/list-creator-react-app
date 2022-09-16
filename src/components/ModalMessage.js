const ModalMessage = ({ promise }) => {
  return (
    <div className='Modal Message'>
      <label>Are you sure to remove this List?</label>
      <div>
        <button className="confirm-button"
          onClick={() => promise.resolve('confirm')}>Confirm</button>
        <button className="confirm-button"
          onClick={() => promise.resolve('cancel')}>Cancel</button>
      </div>
    </div>
  )
}

export default ModalMessage;