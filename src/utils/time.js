import * as fecha from '../../node_modules/_element-ui@2.4.6@element-ui/lib/utils/date'

const time = (val, mask) => {
  return (
    val
      ? fecha.format(val, mask)
      : '-'
  )
}

export default time
