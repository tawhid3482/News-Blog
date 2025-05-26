export enum tagTypes {
  admin = "admin",
  user = "user",
  review = "review",
  news="news",
  reaction="reaction",
  comment="comment",
  category="category",
  tag="tag",
  author="author",
  superUser="superUser",
}

export const tagTypesList = [tagTypes.admin,tagTypes.superUser, tagTypes.user, tagTypes.review, tagTypes.category, tagTypes.reaction, tagTypes.news,tagTypes.tag,tagTypes.comment, tagTypes.author];
