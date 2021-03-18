const formatDate = (date) => {
    return new Intl.DateTimeFormat("tr-TR").format(new Date(date))
}

export default formatDate