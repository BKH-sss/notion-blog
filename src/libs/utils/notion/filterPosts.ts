import { TPosts, TPostStatus, TPostType } from "src/types"

export type FilterPostsOptions = {
  acceptStatus?: (TPostStatus | string)[]
  acceptType?: (TPostType | string)[]
}

const initialOption: FilterPostsOptions = {
  acceptStatus: ["Public", "Published", "public", "published", "ready"],
  acceptType: ["Post", "post", "Paper", "paper", "Page", "page"],
}

export function filterPosts(
  posts: TPosts = [],
  options: FilterPostsOptions = initialOption
) {
  if (!Array.isArray(posts)) return []

  const {
    acceptStatus = ["Public", "Published", "public", "published", "ready"],
    acceptType = ["Post", "post", "Paper", "paper", "Page", "page"],
  } = options

  const current = new Date()
  const tomorrow = new Date(current)
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)

  const normalizedAcceptStatus = acceptStatus.map((s) => s.toLowerCase())
  const normalizedAcceptType = acceptType.map((t) => t.toLowerCase())

  return posts.filter((post) => {
    if (!post || !post.title) return false

    // date check
    const postDate = new Date(post?.date?.start_date || post.createdTime)
    if (postDate > tomorrow) return false

    // status check
    const rawStatus = Array.isArray(post.status)
      ? post.status[0]
      : (post.status || "Public")
    const status = String(rawStatus || "Public").toLowerCase()
    const matchesStatus = normalizedAcceptStatus.some(
      (s) => status.includes(s) || s.includes(status)
    )

    // type check
    const rawType = Array.isArray(post.type)
      ? post.type[0]
      : (post.type || "Post")
    const type = String(rawType || "Post").toLowerCase()
    const matchesType = normalizedAcceptType.some(
      (t) => type.includes(t) || t.includes(type)
    )

    return matchesStatus && matchesType
  })
}
