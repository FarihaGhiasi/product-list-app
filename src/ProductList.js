// Importing necessary modules from React and Material-UI libraries
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  AppBar,
  Toolbar,
} from '@mui/material';

import ProductService from './ProductService';

// Functional component declaration
const ProductList = () => {
  // State variables
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openAddProductDialog, setOpenAddProductDialog] = useState(false);
  

  // Fetching products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await ProductService.getProducts();
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // functions to handle dialog state
  const handleDialog = (isOpen) => () => setOpenAddProductDialog(isOpen);
  const handleCloseDialog = handleDialog(false);

  //rendering product cards
  const renderProductCard = (product) => (
    <Grid key={product.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card>
        <CardMedia component="img" alt={product.title} height="140" image={product.thumbnail} />
        <CardContent style={{ height: '120px' }}>
          <Typography variant="h6">{product.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           <span style={{fontWeight : 'bold'}} > Price: ${product.price} </span>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  const productCards = products.map(renderProductCard);

  // filtering products based on search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Product List React App</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={3}>
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              size="small"
              margin="normal"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" color="primary" fullWidth onClick={handleDialog(true)}>
              Add New Product
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          {searchTerm === '' ? productCards : filteredProducts.map(renderProductCard)}
        </Grid>

        <Dialog open={openAddProductDialog} onClose={handleCloseDialog}>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogContent>
            {['Title', 'Description', 'Price', 'Thumbnail URL'].map((field) => (
              <TextField
                key={field}
                label={field}
                variant="outlined"
                fullWidth
                margin="normal"
              />
            ))}
          </DialogContent>

          <DialogActions>

            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>

            <Button
              color="primary"
              variant="contained"
            >
              Add Product
            </Button>

          </DialogActions>
          
        </Dialog>
      </Container>
    </div>
  );
};

export default ProductList;
