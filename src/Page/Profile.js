import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { CircularProgress, Box } from "@mui/material"; //  <-- 1. استيراد CircularProgress و Box

import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

import { useTranslation } from "react-i18next";
import i18next from "i18next";
export default function Profile() {
  const { t } = useTranslation();

  const [editProfile, setEditProfile] = useState({
    editFull_name: "",
    editBirth_of_day: "",
  });
  const [editName, setEditName] = useState(false);
  const [editBirth, SeteditBirth] = useState(false);
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    Birth_of_day: "",
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setProfile({
          full_name: user.user_metadata.full_name,
          email: user.email,
          Birth_of_day: user.user_metadata.Birth,
        });
        setEditProfile({
          editFull_name: user.user_metadata.full_name,
          editBirth_of_day: user.user_metadata.Birth,
        });
      }
      setLoading(false);
    };
    getUser();
  }, []);
  async function handleSave() {
    console.log(editProfile.editFull_name);
    const { data, error } = await supabase.auth.updateUser({
      data: {
        full_name: editProfile.editFull_name,
        Birth: editProfile.editBirth_of_day,
      },
    });
    if (!error) {
      setProfile({
        ...profile,
        full_name: editProfile.editFull_name,
        Birth_of_day: editProfile.editBirth_of_day,
      });
      setEditName(false);
      SeteditBirth(false);
    } else {
      alert("Error in Editing");
    }

    console.log(data);
  }
  if (loading) {
    return (
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }
  return (
    <Container
      maxWidth="md"
      sx={{
        direction: i18next.language === "ar" ? "rtl" : "ltr",
        py: 4,
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        textAlign="center"
        sx={{
          mb: 4,
          fontSize: { xs: "2rem", md: "3rem" },
        }}
      >
        {t("My Profile")}
      </Typography>
      <Card
        sx={{
          boxShadow: { xs: 0, md: 10 }, //  <-- تعديل: إزالة الظل على الموبايل لمظهر أنظف
          p: { xs: 2, sm: 3, md: 4 }, //  <-- تعديل: جعل الـ padding متجاوبًا
          width: "100%", //  <-- تعديل: جعل البطاقة تأخذ العرض الكامل دائمًا
          maxWidth: "700px", //  <-- تعديل: تحديد أقصى عرض للبطاقة على الشاشات الكبيرة
          mx: "auto", //  <-- تعديل: توسيط البطاقة
        }}
      >
        <CardContent>
          <Stack spacing={4}>
            <Box>
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: 16, md: 20 },
                  wordBreak: "break-word",
                }}
              >
                {t("Email")}:{" "}
                <Typography
                  component="b"
                  sx={{ color: "text.primary", fontWeight: "bold" }}
                >
                  {profile.email}
                </Typography>
              </Typography>
            </Box>

            <Box>
              {editName ? (
                <Stack direction="row" spacing={1} alignItems="center">
                  <TextField
                    fullWidth
                    label={t("Full Name")}
                    variant="standard"
                    value={editProfile.editFull_name}
                    onChange={(e) =>
                      setEditProfile({
                        ...editProfile,
                        editFull_name: e.target.value,
                      })
                    }
                  />
                  <IconButton color="success" onClick={handleSave}>
                    <SaveIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => setEditName(false)}>
                    <CancelIcon />
                  </IconButton>
                </Stack>
              ) : (
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: { xs: 16, md: 20 },
                  }}
                >
                  {t("Full Name")}:{" "}
                  <Typography
                    component="b"
                    sx={{ color: "text.primary", fontWeight: "bold" }}
                  >
                    {profile.full_name}
                  </Typography>
                  <IconButton
                    color="primary"
                    onClick={() => setEditName(true)}
                    disabled={editBirth}
                  >
                    <EditIcon />
                  </IconButton>
                </Typography>
              )}
            </Box>

            <Box>
              {editBirth ? (
                <Stack direction="row" spacing={1} alignItems="center">
                  <TextField
                    fullWidth
                    label={t("Birth of day")}
                    type="date" //  <-- تعديل: استخدام type="date" أفضل
                    InputLabelProps={{ shrink: true }}
                    variant="standard"
                    value={editProfile.editBirth_of_day}
                    onChange={(e) =>
                      setEditProfile({
                        ...editProfile,
                        editBirth_of_day: e.target.value,
                      })
                    }
                  />
                  <IconButton color="success" onClick={handleSave}>
                    <SaveIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => SeteditBirth(false)}>
                    <CancelIcon />
                  </IconButton>
                </Stack>
              ) : (
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: { xs: 16, md: 20 },
                  }}
                >
                  {t("Birth of day")}:{" "}
                  <Typography
                    component="b"
                    sx={{ color: "text.primary", fontWeight: "bold" }}
                  >
                    {profile.Birth_of_day}
                  </Typography>
                  <IconButton
                    color="primary"
                    onClick={() => SeteditBirth(true)}
                    disabled={editName}
                  >
                    <EditIcon />
                  </IconButton>
                </Typography>
              )}
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
