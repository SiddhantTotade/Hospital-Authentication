import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Box, Typography } from "@mui/material";

import { useGetBlogQuery } from "../../services/appApiServices";
import { useAuth } from "../../context/AuthContext";
import AppLinks from "../../components/Links";
import BlogFilter from "../../components/BlogFilter";

export function Blogs() {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { data } = useGetBlogQuery(getToken()["access"]);
  const [filteredData, setFilteredData] = useState(data);

  const handleFilterChange = (category) => {
    if (category === "All Categories") {
      setFilteredData(data);
    } else {
      const filteredBlogs = data.filter((blog) => blog.category === category);
      setFilteredData(filteredBlogs);
    }
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  return (
    <Box sx={{ display: "flex", margin: "auto", width: "60%", gap: "30px" }}>
      <Box
        sx={{
          width: "30%",
          marginTop: "20px",
          height: "50vh",
        }}
      >
        <BlogFilter onFilterChange={handleFilterChange} />
      </Box>
      <Box>
        {filteredData?.map((blog, id) => (
          <Card
            key={id}
            sx={{
              display: "flex",
              width: "100%",
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
              <AppLinks
                onClick={() => navigate(`/app/blogs/${blog.blog_slug}`)}
              >
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
      </Box>
    </Box>
  );
}
