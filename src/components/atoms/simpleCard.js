import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function SimpleCard(props) {
  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardMedia
        component="img"
        height="100"
        image={props.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
         {props.type}
        </Typography>

      </CardContent>

    </Card>
  );
}
