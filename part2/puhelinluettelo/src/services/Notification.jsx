const Notification = ({ message, isGood }) => {
  const style = {
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
      };
  style.color = isGood ? 'green' : 'red';

  if (!message) return null

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification