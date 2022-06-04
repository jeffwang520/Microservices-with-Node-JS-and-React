
const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    let content;

    if (comment.status === "approved") {
      content = comment.content;
    }

    if (comment.status === "pending") {
      content = comment.content + ' (pending)';
    }

    if (comment.status === "rejected") {
      content = comment.content + ' (rejected)';
    }

    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
