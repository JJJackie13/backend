import { socialType } from './enum'

export const socialMediaLink = (type: string) => {
  switch (type) {
    case socialType.INST:
      return 'https://www.instagram.com/'
    case socialType.TW:
      return 'https://twitter.com/'
    case socialType.FB:
      return 'https://www.facebook.com/'
    case socialType.YT:
      return 'https://www.youtube.com/@'
    case socialType.TT:
      return 'https://www.tiktok.com/@'
    default:
      return ''
  }
}
