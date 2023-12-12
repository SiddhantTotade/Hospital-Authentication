import { useNavigate } from "react-router-dom";
import { Card, Box, Typography } from "@mui/material";

import { useGetMyBlogQuery } from "../../services/appApiServices";
import { useAuth } from "../../context/AuthContext";
import AppLinks from "../../components/Links";

export function MyBlogs() {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { data } = useGetMyBlogQuery(getToken()["access"]);

  return (
    <>
      {data?.map((blog, id) => (
        <Card
          key={id}
          sx={{
            display: "flex",
            width: "30%",
            margin: "auto",
            marginTop: "20px",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={blog.image}
              style={{ objectFit: "fill" }}
              width={300}
              height={100}
            />
          </Box>
          <Box>
            <AppLinks onClick={() => navigate(`/app/blogs/${blog.blog_slug}`)}>
              {blog.title}
            </AppLinks>
            <Typography>
              {blog.summary.length <= 15
                ? blog.summary
                : blog.summary.substring(0, 15) + "..."}
            </Typography>
          </Box>
        </Card>
      ))}
    </>
  );
}
