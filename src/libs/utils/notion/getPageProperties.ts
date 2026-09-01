import { getTextContent, getDateValue } from "notion-utils"
import { NotionAPI } from "notion-client"
import { BlockMap, CollectionPropertySchemaMap } from "notion-types"
import { customMapImageUrl } from "./customMapImageUrl"

async function getPageProperties(
  id: string,
  block: BlockMap,
  schema: CollectionPropertySchemaMap
) {
  const api = new NotionAPI()
  const blockEntry = block?.[id]?.value as any
  const blockValue = blockEntry?.value ?? blockEntry
  const rawProperties = Object.entries(blockValue?.properties || [])
  const excludeProperties = ["date", "select", "multi_select", "person", "file"]
  const properties: any = { id }

  for (let i = 0; i < rawProperties.length; i++) {
    const [key, val]: any = rawProperties[i]
    const schemaItem = schema?.[key]
    if (!schemaItem) continue

    const schemaName = schemaItem.name
    const schemaNameLower = schemaName.toLowerCase()
    const schemaType = schemaItem.type

    let value: any

    if (schemaType && !excludeProperties.includes(schemaType)) {
      value = getTextContent(val)
    } else {
      switch (schemaType) {
        case "file": {
          try {
            const Block = blockValue
            const url: string = val[0][1][0][1]
            value = customMapImageUrl(url, Block)
          } catch (error) {
            value = undefined
          }
          break
        }
        case "date": {
          const dateProperty: any = getDateValue(val)
          if (dateProperty) {
            delete dateProperty.type
            value = dateProperty
          }
          break
        }
        case "select": {
          const selects = getTextContent(val)
          if (selects && selects.length > 0) {
            value = selects.split(",").map((s: string) => s.trim())
          }
          break
        }
        case "multi_select": {
          const selects = getTextContent(val)
          if (selects && selects.length > 0) {
            value = selects.split(",").map((s: string) => s.trim())
          }
          break
        }
        case "person": {
          try {
            const rawUsers = val.flat()
            const users = []
            for (let j = 0; j < rawUsers.length; j++) {
              if (rawUsers[j][0][1]) {
                const userId = rawUsers[j][0]
                const res: any = await api.getUsers(userId)
                const resValue =
                  res?.recordMapWithRoles?.notion_user?.[userId[1]]?.value
                const user = {
                  id: resValue?.id,
                  name:
                    resValue?.name ||
                    `${resValue?.family_name ?? ""}${resValue?.given_name ?? ""}` ||
                    undefined,
                  profile_photo: resValue?.profile_photo || null,
                }
                users.push(user)
              }
            }
            value = users
          } catch (e) {
            value = []
          }
          break
        }
        default:
          value = getTextContent(val)
          break
      }
    }

    properties[schemaName] = value
    properties[schemaNameLower] = value

    if (schemaNameLower === "name" && !properties.title) {
      properties.title = value
    }
  }

  // Ensure array format for select/multi_select fields
  if (typeof properties.status === "string") properties.status = [properties.status]
  if (typeof properties.type === "string") properties.type = [properties.type]
  if (typeof properties.category === "string") properties.category = [properties.category]
  if (typeof properties.tags === "string") properties.tags = [properties.tags]

  // Safe defaults
  if (!properties.status || properties.status.length === 0) properties.status = ["Public"]
  if (!properties.type || properties.type.length === 0) properties.type = ["Post"]
  if (!properties.slug && properties.id) properties.slug = properties.id.replace(/-/g, "")

  return properties
}

export { getPageProperties as default }
