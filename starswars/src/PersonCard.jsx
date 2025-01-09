import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

function PersonCard({ person }) {
  return (
    <>
      <Card sx={{ maxWidth: 200 }}>
        <CardMedia
          sx={{ height: 200 }}
          image={"https://starwars-visualguide.com/assets/img/characters/" + person.url.split("/")[5] + ".jpg"}
          title={person.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {person.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Mass: {person.mass}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Height: {person.height}
          </Typography>
        </CardContent>
        {/* <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </Card>
    </>
  );
}
export default PersonCard;
