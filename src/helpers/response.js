module.exports = (res, status, success, message, results, ...optional) => {
  const [
    totalData,
    totalPage,
    currentPage,
    prevLink,
    nextLink
  ] = optional

  if (optional && optional.length >= 1) {
    res.status(status).json({
      success,
      message,
      status,
      results,
      pageInfo: {
        totalData: totalData && totalData,
        totalPage: totalData && totalPage,
        currentPage: currentPage && currentPage,
        prevLink: prevLink && prevLink,
        nextLink: nextLink && nextLink
      }
    })
  } else {
    res.status(status).json({
      success,
      message,
      status,
      results
    })
  }
}
