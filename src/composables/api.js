import axios from "axios"

const getUsers = async () => {

    let users = []

    await axios.get("https://cornie-assessment.herokuapp.com/users/edg72D9sS0FeK7X")
        .then(res => {
            users = res.data
        })
        .catch(err => console.log(err.message))

    return users
}

const markPaid = async (id) => {
  
    await axios.patch(`https://cornie-assessment.herokuapp.com/mark-paid/${id}`)
        .then((res) => {
            return true
        })
        .catch(err => console.log(err.message))
}


const activate = async (id) => {
    await axios
    .patch(
      `https://cornie-assessment.herokuapp.com/activate-user/${id}`
    )
    .then((res) => {
      return true
    })
    .catch((err) => console.log(err.message));
}

const deactivate = async (id) => {
    await axios
    .patch(
      `https://cornie-assessment.herokuapp.com/deactivate-user/${id}`
    )
    .then((res) => {
      return true
    })
    .catch((err) => console.log(err.message));
}

const del = async (id) => {
    await axios
    .patch(
      `https://cornie-assessment.herokuapp.com/remove-user/${id}`
    )
    .then((res) => {
      return true
    })
    .catch((err) => console.log(err.message));
}


export default {
    getUsers,
    markPaid,
    activate,
    deactivate,
    del
}