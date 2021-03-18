import Fuse from 'fuse.js'

const defaultOptions = {
  includeScore: true,
  // Search in `author` and in `tags` array
  keys: ['author', 'tags']
}



export const search = (query: string, list: Array<any>, options: Fuse.IFuseOptions<unknown>) => {
  const fuse = new Fuse(list, options)
  const result = fuse.search(query)
  return result
}