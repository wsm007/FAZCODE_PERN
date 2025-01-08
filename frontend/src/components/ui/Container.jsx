export function Container({ children, className }) {
  return (
    <div className={'maxw7xl px-4 mx-auto ' + className}>
      {children}
    </div>
  )
}
