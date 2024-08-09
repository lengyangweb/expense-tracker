
const footerStyle = {
    width: '100vw',
    position: 'absolute',
    bottom: '0'
}

const Footer = () => {
  return (
    <div className="border border-2 border-left-0 py-2 bg-secondary text-light p-0 border-0" style={ footerStyle }>
        <div className="d-flex justify-content-between px-4">
            <i>expTracker</i>
            <span>Copyright &copy; 2024</span>
        </div>
    </div>
  )
}

export default Footer