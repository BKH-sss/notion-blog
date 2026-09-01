import Detail from "src/routes/Detail"
import { filterPosts } from "src/libs/utils/notion"
import { CONFIG } from "site.config"
import { NextPageWithLayout } from "../types"
import CustomError from "src/routes/Error"
import { getRecordMap, getPosts } from "src/apis"
import MetaConfig from "src/components/MetaConfig"
import { GetStaticProps } from "next"
import { queryClient } from "src/libs/react-query"
import { queryKey } from "src/constants/queryKey"
import { dehydrate } from "@tanstack/react-query"
import usePostQuery from "src/hooks/usePostQuery"
import { FilterPostsOptions } from "src/libs/utils/notion/filterPosts"

const filter: FilterPostsOptions = {
  acceptStatus: ["Public", "Published", "PublicOnDetail", "public", "published"],
  acceptType: ["Paper", "Post", "Page", "paper", "post", "page"],
}

export const getStaticPaths = async () => {
  try {
    const posts = await getPosts()
    const filteredPost = filterPosts(posts, filter)

    return {
      paths: filteredPost.map((row) => `/${row.slug}`),
      fallback: "blocking",
    }
  } catch (error) {
    return {
      paths: [],
      fallback: "blocking",
    }
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug as string

  try {
    const posts = await getPosts()
    const feedPosts = filterPosts(posts)
    await queryClient.prefetchQuery(queryKey.posts(), () => feedPosts)

    const detailPosts = filterPosts(posts, filter)
    const postDetail = detailPosts.find(
      (t: any) =>
        t.slug === slug ||
        t.id === slug ||
        t.id?.replace(/-/g, "") === slug
    )

    if (!postDetail || !postDetail.id) {
      return {
        notFound: true,
        revalidate: 60,
      }
    }

    const recordMap = await getRecordMap(postDetail.id)
    if (!recordMap) {
      return {
        notFound: true,
        revalidate: 60,
      }
    }

    await queryClient.prefetchQuery(queryKey.post(`${slug}`), () => ({
      ...postDetail,
      recordMap,
    }))

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
      revalidate: CONFIG.revalidateTime,
    }
  } catch (error) {
    console.error(`Error loading slug "${slug}":`, error)
    return {
      notFound: true,
      revalidate: 60,
    }
  }
}

const DetailPage: NextPageWithLayout = () => {
  const post = usePostQuery()

  if (!post) return <CustomError />

  const image =
    post.thumbnail ??
    CONFIG.ogImageGenerateURL ??
    `${CONFIG.ogImageGenerateURL}/${encodeURIComponent(post.title || "")}.png`

  const date = post.date?.start_date || post.createdTime || ""
  const postType = Array.isArray(post.type) ? post.type[0] : (post.type || "Post")

  const meta = {
    title: post.title || CONFIG.blog.title,
    date: date ? new Date(date).toISOString() : new Date().toISOString(),
    image: image,
    description: post.summary || "",
    type: postType,
    url: `${CONFIG.link}/${post.slug || ""}`,
  }

  return (
    <>
      <MetaConfig {...meta} />
      <Detail />
    </>
  )
}

DetailPage.getLayout = (page) => {
  return <>{page}</>
}

export default DetailPage
