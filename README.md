
# Tea Stash Manager

## User Stories

### User Login
- **As a user, I should be able to login**
  - **Given** the user wants to login
  - **When** the user enters their email
  - **Then** they will be navigated to view their list of teas

### View Tea Details
- **As I am logged in, I should be able to view the details of my teas**
  - **Given** the user wants to view a specific tea's details
  - **When** the user clicks on the title of their tea
  - **Then** they will be navigated to the tea details page

### Edit Tea Details
- **As I am viewing the details, I should be able to edit them**
  - **Given** the user wants to edit a tea's details
  - **When** the user clicks Edit
  - **Then** they will be navigated to the edit tea form

### Save Edited Tea Details
- **As I am done editing the details, I should be able to permanently save the changes**
  - **Given** the user is done editing
  - **When** the user clicks save changes
  - **Then** the database will be updated with their changes and they will be navigated to the All Teas page

### Delete a Tea
- **As I am editing the details**
  - **Given** the user wishes to delete a tea
  - **When** the user clicks delete
  - **Then** the tea is removed from the database and the user is redirected to the All Teas page

### Add a New Tea
- **As I want to add a new tea**
  - **Given** the user wishes to add a tea to their stash
  - **When** the user clicks new tea from the navbar anywhere on the site
  - **Then** the user is redirected to the Add Tea form

### Save New Tea
- **As I am done adding the details to a new tea**
  - **Given** the user wishes to save their new tea to their stash
  - **When** the user clicks add to stash
  - **Then** the user is redirected to All Teas and the new tea is added to the database

## Stretch Goals

### Remove from Favorites
- **As I am viewing my favorites**
  - **Given** the user wishes to remove a tea from their favorites
  - **When** the user clicks remove
  - **Then** the tea is removed from favorites and Favorites page is updated with the changes made

### Sort by Category
- **As I am viewing all of my teas**
  - **Given** the user wants to sort by category
  - **When** the user selects a category to sort by
  - **Then** only teas in that category are shown

### Sort by Vendor
- **As I am viewing all of my teas**
  - **Given** the user wants to sort by vendor
  - **When** the user selects a vendor to sort by
  - **Then** only teas sold by that vendor are shown

### Sort by Price
- **As I am viewing all of my teas**
  - **Given** the user wishes to sort by price
  - **When** the user chooses how to sort (high to low, or low to high)
  - **Then** all teas should be listed in the order the user chose
