import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Box, Typography, TextField } from "@mui/material";

import { useGetBlogQuery } from "../../services/appApiServices";
import { useAuth } from "../../context/AuthContext";
import AppLinks from "../../components/Links";
import BlogFilter from "../../components/BlogFilter";

export function Blogs() {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { data } = useGetBlogQuery(getToken()["access"]);
  const [filteredData, setFilteredData] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (category) => {
    if (category === "All Categories") {
      setFilteredData(data?.filter((blog) => !blog.is_draft));
    } else {
      const filteredBlogs = data.filter((blog) => blog.category === category);
      setFilteredData(filteredBlogs);
    }
  };

  const handleSearch = (searchTerm) => {
    const filteredBlogs = data.filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredBlogs);
  };

  useEffect(() => {
    const filteredBlogs = data?.filter((blog) => !blog.is_draft);
    setFilteredData(filteredBlogs);
  }, [data]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">Blogs</Typography>
      <Box sx={{ display: "flex", margin: "auto", width: "80%", gap: "30px" }}>
        <Box
          sx={{
            width: "30%",
            marginTop: "20px",
            height: "50vh",
          }}
        >
          <BlogFilter onFilterChange={handleFilterChange} />
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleSearch(e.target.value);
            }}
            value={searchTerm}
            style={{ marginTop: "10px" }}
          />
        </Box>
        <Box sx={{ width: "50%" }}>
          {filteredData?.length !== 0 ? (
            filteredData?.map((blog, id) => (
              <Card
                key={id}
                sx={{
                  display: "flex",
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
            ))
          ) : (
            <Typography>Data not found</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
