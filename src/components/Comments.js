import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

export function Comments({ homePag, id, comments, TransitionEffect, commentTitle }) {
  return (
      <List>
        <List key={id}>
        {(homePag === "true" ) ? 
            (comments.map(
              (comment) =>
                (comment.postId === id 
                  && (comment.id === 6 || comment.id === 11)
                 )&& 
                (
                  <ListItem key={comment.id}>
                    <TransitionEffect
                      key={comment.id}
                      threshold={25}
                      timeout={6500}
                      method="zoom"
                    >
                      <ListItemText
                        variatn="caption"
                        primary={`${commentTitle}:`}
                        secondary={
                          <>
                            <Typography
                              color="secondary"
                              variant="caption"
                              component="span"
                            >
                              Email: {comment.email}
                            </Typography>
                            <Typography variant="caption" component="p">
                              {comment.body}
                            </Typography>
                          </>
                        }
                      />
                    </TransitionEffect>
                  </ListItem>
                )
            )  
        ):((id === 'comments') && (
          <Stack
            spacing={4}
            sx={{ paddingBottom: "2rem", paddingLeft: "2rem" }}
          >
            {comments.map((comment) => (
              <TransitionEffect
                threshold={100}
                timeout={2000}
                key={comment.id}
                method="zoom"
              >
                <Card
                  key={comment.id}
                  sx={{
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" component="h3">
                      Name : {comment.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Email : {comment.email}
                    </Typography>
                    <Typography variant="subtitle2" color="primary">
                      {comment.body}
                    </Typography>
                  </CardContent>
                </Card>
              </TransitionEffect>
            ))}
          </Stack>
        ))}
        </List>
      </List>
  );
}

export default Comments;
