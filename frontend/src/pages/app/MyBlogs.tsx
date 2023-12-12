import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Card,
  Box,
  Typography,
  CircularProgress,
  TextField,
} from "@mui/material";

import { useGetMyBlogQuery } from "../../services/appApiServices";
import { useAuth } from "../../context/AuthContext";
import AppLinks from "../../components/Links";
import BlogFilter from "../../components/BlogFilter";
import PrirmaryButton from "../../components/PrimaryButton";
import { useToggleDraft } from "../../hooks/toggleDraft";
import AppAlert from "../../components/Alerts";

export function MyBlogs() {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { onSubmit, isLoading, message } = useToggleDraft();
  const { data } = useGetMyBlogQuery(getToken()["access"]);
  const [filteredData, setFilteredData] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (category) => {
    if (category === "All Categories") {
      setFilteredData(data);
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
    setFilteredData(data);
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
      <Typography variant="h4">My Blogs</Typography>
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
        <Box>
          {filteredData?.length !== 0 ? (
            filteredData?.map((blog, id) => (
              <Card
                key={id}
                sx={{
                  display: "flex",
                  width: "100%",
                  margin: "auto",
                  marginTop: "20px",
                  alignItems: "center",
                  justifyContent: "space-between",
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "end",
                    padding: "10px",
                  }}
                >
                  {blog.is_draft ? (
                    isLoading ? (
                      <CircularProgress />
                    ) : (
                      <PrirmaryButton
                        label="Mark as Draft"
                        color="success"
                        onClick={() => onSubmit(blog.id)}
                      />
                    )
                  ) : isLoading ? (
                    <CircularProgress />
                  ) : (
                    <PrirmaryButton
                      label="UnMark as Draft"
                      color="error"
                      onClick={() => onSubmit(blog.id)}
                    />
                  )}
                </Box>
              </Card>
            ))
          ) : (
            <Typography>Data not found</Typography>
          )}
        </Box>
      </Box>
      <AppAlert message={message} />
    </Box>
  );
}
