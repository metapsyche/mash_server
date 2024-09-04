Here are JSON samples for testing the various API routes related to artists based on your updated `artists` table structure:

### 1. **Create a New Artist (`POST /artists`)**
```json
{
  "name": "John Doe",
  "type": "musician artist",
  "description": "A versatile musician with a unique blend of classical and contemporary styles.",
  "profilePicture": "https://example.com/images/johndoe.jpg",
  "walletAddress": "0x1234567890abcdef1234567890abcdef12345678"
}
```

### 2. **Get All Artists (`GET /artists`)**
#### **Sample Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "type": "musician artist",
    "description": "A versatile musician with a unique blend of classical and contemporary styles.",
    "profilePicture": "https://example.com/images/johndoe.jpg",
    "walletAddress": "0x1234567890abcdef1234567890abcdef12345678",
    "createdAt": "2024-09-04T12:34:56.789Z"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "type": "tattoo artist",
    "description": "Specializes in detailed, custom-designed tattoos with a focus on realism.",
    "profilePicture": "https://example.com/images/janesmith.jpg",
    "walletAddress": "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    "createdAt": "2024-09-03T11:22:33.444Z"
  }
]
```

### 3. **Get a Specific Artist (`GET /artists/:id`)**
#### **Sample Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "type": "musician artist",
  "description": "A versatile musician with a unique blend of classical and contemporary styles.",
  "profilePicture": "https://example.com/images/johndoe.jpg",
  "walletAddress": "0x1234567890abcdef1234567890abcdef12345678",
  "createdAt": "2024-09-04T12:34:56.789Z"
}
```

### 4. **Update a Specific Artist (`PUT /artists/:id`)**
```json
{
  "name": "John Doe Updated",
  "type": "musician artist",
  "description": "An updated description with more details about the musician's style and achievements.",
  "profilePicture": "https://example.com/images/johndoe_updated.jpg",
  "walletAddress": "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd"
}
```

### 5. **Delete a Specific Artist (`DELETE /artists/:id`)**
#### **No JSON body required for the request.**

#### **Sample Response:**
```json
{}
```

These JSON samples cover creating, retrieving, updating, and deleting artists with the specified fields in your table structure. You can use them to test the corresponding API endpoints for managing artist data.






Here are JSON samples for testing the various API routes related to solo works:



### 1. **Create a New Solo Work (`POST /artists/:artistId/solo-works`)**
```json
{
  "type": "Song",
  "title": "Jungle",
  "file_name": "Jungle.mp3",
  "song_url": "https://open.spotify.com/track/3L181zUSmJBhClIwqKj911?si=d0c958c1c6b849fa",
  "price": ".04 ETH (~$107)",
  "scarcity": "100",
  "utility": "20% off live shows",
  "tags": ["HipHop", "indierap", "workout", "city"],
  "geo": "NYC",
  "image_url": "https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2F1.Jungle.jpg?alt=media&token=eb8d2abd-4b2c-46aa-84d2-d54aa626ccfc"
}
```

### 2. **Get All Solo Works for a Specific Artist (`GET /artists/:artistId/solo-works`)**
#### **Sample Response:**
```json
[
  {
    "id": 1,
    "artist_id": 123,
    "type": "Song",
    "title": "Jungle",
    "file_name": "Jungle.mp3",
    "song_url": "https://open.spotify.com/track/3L181zUSmJBhClIwqKj911?si=d0c958c1c6b849fa",
    "price": ".04 ETH (~$107)",
    "scarcity": "100",
    "utility": "20% off live shows",
    "tags": ["HipHop", "indierap", "workout", "city"],
    "geo": "NYC",
    "image_url": "https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2F1.Jungle.jpg?alt=media&token=eb8d2abd-4b2c-46aa-84d2-d54aa626ccfc",
    "created_at": "2024-09-04T12:34:56.789Z"
  },
  {
    "id": 2,
    "artist_id": 123,
    "type": "Tattoo",
    "title": "Dragon Sleeve",
    "file_name": "Dragon_Sleeve.jpg",
    "price": "500 USD",
    "scarcity": "Unique",
    "utility": "Free touch-up",
    "tags": ["Tattoo", "Dragon", "Japanese"],
    "geo": "Los Angeles",
    "image_url": "https://example.com/tattoo_images/dragon_sleeve.jpg",
    "created_at": "2024-09-03T11:22:33.444Z"
  }
]
```

### 3. **Get a Specific Solo Work (`GET /artists/:artistId/solo-works/:soloWorkId`)**
#### **Sample Response:**
```json
{
  "id": 1,
  "artist_id": 123,
  "type": "Song",
  "title": "Jungle",
  "file_name": "Jungle.mp3",
  "song_url": "https://open.spotify.com/track/3L181zUSmJBhClIwqKj911?si=d0c958c1c6b849fa",
  "price": ".04 ETH (~$107)",
  "scarcity": "100",
  "utility": "20% off live shows",
  "tags": ["HipHop", "indierap", "workout", "city"],
  "geo": "NYC",
  "image_url": "https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2F1.Jungle.jpg?alt=media&token=eb8d2abd-4b2c-46aa-84d2-d54aa626ccfc",
  "created_at": "2024-09-04T12:34:56.789Z"
}
```

### 4. **Update a Specific Solo Work (`PUT /artists/:artistId/solo-works/:soloWorkId`)**
```json
{
  "type": "Song",
  "title": "Jungle (Remastered)",
  "file_name": "Jungle_Remastered.mp3",
  "song_url": "https://open.spotify.com/track/3L181zUSmJBhClIwqKj911?si=d0c958c1c6b849fa",
  "price": ".05 ETH (~$130)",
  "scarcity": "100",
  "utility": "30% off live shows",
  "tags": ["HipHop", "indierap", "remastered"],
  "geo": "NYC",
  "image_url": "https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2F1.Jungle_Remastered.jpg?alt=media&token=eb8d2abd-4b2c-46aa-84d2-d54aa626ccfc"
}
```

### 5. **Delete a Specific Solo Work (`DELETE /artists/:artistId/solo-works/:soloWorkId`)**
#### **No JSON body required for the request.**

#### **Sample Response:**
```json
{}
```

You can use these JSON samples to test the various API endpoints. They cover creating, retrieving, updating, and deleting solo works for specific artists.