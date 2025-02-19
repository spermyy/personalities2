import { useState } from 'react';
import { artistlist } from './Data';
import { Box, Button, IconButton, Typography, Collapse } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

 
  if (!artistlist || artistlist.length === 0) {
    return <Typography variant="h4" color="error" align="center">No artists available</Typography>;
  }

  const hasNext = index < artistlist.length - 1;
  const hasPrev = index > 0;

  function handleNextClick() {
    setIndex((prev) => (hasNext ? prev + 1 : 0));
  }

  function handleBackClick() {
    setIndex((prev) => (hasPrev ? prev - 1 : artistlist.length - 1));
  }

  function handleMoreClick() {
    setShowMore((prev) => !prev);
  }

  const artist = artistlist[index]; 

  return (
    <Box
      sx={{
        width: '400px',
        margin: 'auto',
        padding: '20px',
        textAlign: 'center',
        borderRadius: '10px',
        boxShadow: 3,
        bgcolor: '#f5f5f5',
        border: '2px solid #000',
      }}
    >
      <Typography variant="h4" fontWeight="bold" color="#000">
        ARTIST GALLERY
      </Typography>
      <Typography variant="h6" fontWeight="bold" color="#333">
        DANIEL MANARANG C-PEITEL3
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
        <Button
          variant="contained"
          sx={{ bgcolor: '#666', '&:hover': { bgcolor: '#333' } }}
          onClick={handleBackClick}
          disabled={!hasPrev}
        >
          Back
        </Button>
        <Button
          variant="contained"
          sx={{ bgcolor: '#000', '&:hover': { bgcolor: '#333' } }}
          onClick={handleNextClick}
        >
          Next
        </Button>
      </Box>

      <Typography variant="h5" sx={{ mt: 2, color: '#000' }}>
        {artist?.artist || ""}
      </Typography>
      <Typography variant="subtitle1" color="#666">
        {index + 1} of {artistlist.length}
      </Typography>

      <IconButton
        onClick={handleMoreClick}
        sx={{
          mt: 1,
          color: '#000',
          transition: 'transform 0.3s ease',
          transform: showMore ? 'rotate(180deg)' : 'rotate(0deg)',
        }}
      >
        <ExpandMore />
      </IconButton>

      <Collapse in={showMore} timeout="auto">
        <Typography variant="body1" sx={{ mt: 1, px: 2, color: '#666' }}>
          {artist?.description || "No description available."}
        </Typography>
      </Collapse>

      <Box sx={{ mt: 2 }}>
        {artist?.url ? (
          <img
            className="artist-image"
            src={artist.url}
            alt={`Image of ${artist.artist || "Unknown Artist"}`}
            style={{
              width: '100%',
              borderRadius: '10px',
              border: '3px solid #000',
              filter: 'grayscale(100%)',
              transition: 'filter 0.3s ease, opacity 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.filter = 'grayscale(0%)';
              e.currentTarget.style.opacity = '0.8';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.filter = 'grayscale(100%)';
              e.currentTarget.style.opacity = '1';
            }}
          />
        ) : (
          <Typography variant="body2" color="error">
            No image available
          </Typography>
        )}
      </Box>
    </Box>
  );
}