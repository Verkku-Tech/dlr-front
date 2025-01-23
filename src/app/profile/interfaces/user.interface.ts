
export interface User {
  _id: string
  name: string
  email: string
  phoneNumber: string
  gender: string
  address: string
  active: boolean
  image?: ArrayBuffer | string | null
  imgUrl: string | null
}
