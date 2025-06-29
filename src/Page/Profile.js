import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

import { useTranslation } from "react-i18next";
import i18next from "i18next";
export default function Profile() {
  const { t, i18n } = useTranslation();

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

  useEffect(() => {
    const getUser = async () => {
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
  return (
    <Container
      maxWidth="md"
      sx={{
        direction: i18next.language === "ar" ? "rtl" : "ltr",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
      }}
    >
      <Typography variant="h3" sx={{ mb: 4 }}>
        {t("My Profile")}
      </Typography>
      <Card
        sx={{
          boxShadow: 10,
          padding: 5,
          display: "flex",
        }}
      >
        <CardContent>
          <Typography sx={{ color: "text.secondary", mb: 7, fontSize: 24 }}>
            {t("Email")}: <b> {profile.email}</b>
          </Typography>
          {editName ? (
            <>
              <TextField
                id="standard-basic"
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
              <Button
                sx={{ m: 2 }}
                color="success"
                variant="outlined"
                onClick={handleSave}
              >
                <SaveIcon /> {t("Save")}
              </Button>
              <Button
                sx={{ m: 1 }}
                variant="outlined"
                onClick={() => setEditName(false)}
              >
                <CancelIcon /> {t("Cancel")}
              </Button>
            </>
          ) : (
            <Typography
              gutterBottom
              sx={{
                color: "text.secondary",
                fontSize: 24,

                mb: 4,
              }}
            >
              {t("Full Name")}: <b>{profile.full_name} </b>{" "}
              <IconButton
                size="large"
                aria-label="EditIcon"
                sx={{
                  background: "white",
                  "&:hover": {
                    bgcolor: "primary.light",
                  },
                }}
                color="primary"
                onClick={() => {
                  setEditName(true);
                }}
                disabled={editBirth}
              >
                {" "}
                <EditIcon />
              </IconButton>
            </Typography>
          )}

          {editBirth ? (
            <>
              <TextField
                id="standard-basic"
                label={t("Birth of day")}
                variant="standard"
                value={editProfile.editBirth_of_day}
                onChange={(e) =>
                  setEditProfile({
                    ...editProfile,
                    editBirth_of_day: e.target.value,
                  })
                }
              />
              <Button
                sx={{ m: 2 }}
                color="success"
                variant="outlined"
                onClick={handleSave}
              >
                <SaveIcon /> {t("Save")}
              </Button>
              <Button
                sx={{ m: 1 }}
                variant="outlined"
                onClick={() => SeteditBirth(false)}
              >
                <CancelIcon /> {t("Cancel")}
              </Button>
            </>
          ) : (
            <Typography sx={{ color: "text.secondary", mb: 3, fontSize: 24 }}>
              {t("Birth of day")}: <b>{profile.Birth_of_day} </b>
              <IconButton
                size="large"
                aria-label="EditIcon"
                sx={{
                  background: "white",
                  "&:hover": {
                    bgcolor: "primary.light",
                  },
                }}
                color="primary"
                onClick={() => {
                  SeteditBirth(true);
                }}
                disabled={editName}
              >
                <EditIcon />
              </IconButton>
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
