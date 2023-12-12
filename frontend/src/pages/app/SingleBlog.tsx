import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useGetDetailBlogQuery } from "../../services/appApiServices";
import { useAuth } from "../../context/AuthContext";

export const SingleBlog = () => {
  const location = useLocation();
  const match = location.pathname.match(/\/blogs\/([a-zA-Z0-9]+)/);
  const extractedSlug = match ? match[1] : null;
  const { getToken } = useAuth();

  const getDetailBlog = useGetDetailBlogQuery({
    access: getToken()["access"],
    slug: extractedSlug,
  });

  return (
    <Box
      sx={{
        marginTop: "20px",
        width: "50%",
        marginLeft: "auto",
        marginRight: "auto",
        display: "grid",
        justifyContent: "start",
        gap: "30px",
      }}
    >
      <Box>
        <img src={getDetailBlog.data?.image} width={200} height={200} />
      </Box>
      <Box sx={{ gap: "10px" }}>
        <Typography variant="h4">{getDetailBlog.data?.title}</Typography>
        <Box>
          <Typography>
            Author - {getDetailBlog.data?.user_first_name}
          </Typography>
          <Typography>{getDetailBlog.data?.user_email}</Typography>
          <Typography>
            Publish on -{" "}
            {new Date(getDetailBlog.data?.created_at).toDateString()}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography>{getDetailBlog.data?.content}</Typography>
      </Box>
      <Box>
        <Typography>{getDetailBlog.data?.summary}</Typography>
      </Box>
    </Box>
  );
};
