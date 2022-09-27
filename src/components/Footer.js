
const Footer = () => {
  const today = new Date()
  return (
    <footer className="Footer">
      <small>Copyright &copy; {today.getFullYear()}</small>
    </footer>
  )
}

export default Footer
