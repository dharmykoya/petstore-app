import dayjs from 'dayjs'

export const useFormatDate = () => {
  const formatDate = (date: Date) => {
    if (!date) {
      return 'N/A'
    }
    return dayjs(date).format('MMMM DD, YYYY')
  }

  return { formatDate }
}
