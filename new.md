Here are JSON samples for testing the various API routes related to artists based on your updated `artists` table structure:


psql "host=aws-0-us-east-1.pooler.supabase.com port=6543 dbname=postgres user=postgres.ybeyoytikxbzawoatztb password=Saisreesatya sslmode=require"


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












{
  "type": "Song",x
  "title": "THISMINORITY",
  "file_name": "Biohazard",
  "image_url": "https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2F1.Biohazard.jpg?alt=media&token=cc8c6cfd-fc98-40ae-b809-afba8e72ba65",
  "price": 0.02,
  "song_url":"https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2FBiohazard.mp3?alt=media&token=28e39d17-3c51-473c-8b1d-b2b8639d590e",
  "scarcity": "/ 100",
  "utility": "20% off live shows",
  "tags": ["skull", "gold"],
  "geo": "NYC"
}


Drawing	Mike Bellamy	Golden Buddah	See below	.02ETH (~$53)	144 / 5,000	10% off tattoo	baby, Buddah, peaceful, spiritual, 	NYC https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/2.Golden%20Buddah.jpeg?alt=media&token=8c1520ce-f62e-4658-91c2-49a7b74430d2
Painting	Mike Bellamy	Tragically Royal	See below	.02ETH (~$53)	199 / 5,000	10% off tattoo	skull, dark, medieval, 	NYC https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/3.Tragically%20Royal.jpeg?alt=media&token=36a5be26-cc70-4f1d-9d8c-459a7d1cd791
Photography	Mike Bellamy	Shaman	See below	.02ETH (~$53)	527 / 5,000	10% off tattoo	baby, magic, woods, mysterious,	NYC https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/4.Shaman.jpeg?alt=media&token=c583457b-e593-4260-9418-39679542cf07
Painting	Mike Bellamy	Behind The Mask	See below	.02ETH (~$53)	741 / 5,000	10% off tattoo	skull, stilllife, 	NYC https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/5.Behind%20The%20Mask.jpeg?alt=media&token=02748691-1c38-4377-a3bb-7befc4effb4b
Painting	Mike Bellamy	Valhalla	See below	.02ETH (~$53)	624 / 5,000	10% off tattoo	skull, viking, strong,	NYC https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/6.Valhalla.jpeg?alt=media&token=a2b204fc-9a60-4e6b-9d29-b20fb90fc01f
Drawing	Mike Bellamy	Pray For LA	See below	.02ETH (~$53)	404 / 5,000	10% off tattoo	LA, hands, neon, urban, 	NYC https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/7.Pray%20For%20LA.jpeg?alt=media&token=b5ed86fb-cc65-47fd-9bae-2a9ddb70ab6a
Photography	Mike Bellamy	Behind The Veil	See below	.02ETH (~$53)	801 / 5,000	10% off tattoo	spooky, horror, angry, 	NYC https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/8.Behind%20The%20Veil.jpeg?alt=media&token=fcf36cb7-6d4c-4939-8b57-457d8adadacd
Painting	Mike Bellamy	Frozen In Time	See below	.02ETH (~$53)	781 / 5,000	10% off tattoo	animals, bird, skeleton, 	NYC https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/9.Frozen%20In%20Time.jpeg?alt=media&token=821f202c-2806-40b5-bbf5-3972dfd0fb77
Photography	Mike Bellamy	Faced	See below	.02ETH (~$53)	681 / 5,000	10% off tattoo	woman, skeleton, dancing, spooky, 	NYC https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/10.Faced.jpeg?alt=media&token=73cc49cc-5deb-4d97-8d0f-4476975791e5
Drawing	Mike Bellamy	Dapper Don’t Matter	See below	.02ETH (~$53)	372 / 5,000	10% off tattoo	skeleton, dapper, fun	NYC https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/11.Dapper%20Don%E2%80%99t%20Matter.jpeg?alt=media&token=7106a2a7-a1df-40a1-99d4-06bce7547fe8
Drawing	Mike Bellamy	Dragonsuit	See below	.02ETH (~$53)	521 / 5,000	10% off tattoo	dragon, tattoo, energetic,	NYC https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/12.Dragonsuit.jpeg?alt=media&token=5a9d51c3-3774-4683-a459-418b4a5b4f8f
Photography	Mike Bellamy	Voyager	See below	.02ETH (~$53)	894 / 5,000	10% off tattoo	baby, space, ambient, 	NYC https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/13.Voyager.jpeg?alt=media&token=e473a191-a3e3-4a0f-b8ad-ab92eea67104
Drawing	Mike Bellamy	Roosternoose	See below	.02ETH (~$53)	174 / 5,000	10% off tattoo	animals, rooster, country	NYC https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/14.Roosternoose.jpeg?alt=media&token=9c6a6c60-8637-4531-8e36-28397d333687
Drawing	Mike Bellamy	Samurai Skull	See below	.02ETH (~$53)	104 / 5,000	10% off tattoo	skull, martial arts, mad, aggressive, 	NYC https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/15.Samurai%20Skull.jpeg?alt=media&token=0bc034a5-a346-433d-944b-4f1f2575e520





















same for thiese
Song	THISMINORITY	BELLS	https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2Fsongs%2FOTTO%20MOSS%20-%20BELLS.mp3?alt=media&token=0774dd20-3635-48ea-b59a-4324889d8d62	.04 ETH (~$107)	/ 100	20% off live shows	HipHop, hybrid, driving,	NYC https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2F3.BELLS.jpg?alt=media&token=29d2e5e2-ec93-4d61-924b-0a83d31c2a92
Song	THISMINORITY	What Is You Servin	https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2Fsongs%2FHookline%20-%20What%20Is%20You%20Servin.mp3?alt=media&token=21ea9456-5683-4114-9df0-6e27ce140736	.04 ETH (~$107)	/ 100	20% off live shows	HipHop, hybrid, edm, dance,	NYC https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2F4.What%20Is%20You%20Servin.jpg?alt=media&token=f8756454-5ffa-44b7-a9b4-94fe7169f6ad 
Song	THISMINORITY	Let Me Have This	https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2Fsongs%2FProd.%20Riddiman%20-%20JUST%20ME.mp3?alt=media&token=3259c80a-beba-4f35-85e2-9acf5274dbbe	.04 ETH (~$107)	/ 100	20% off live shows	HipHop, summertime, chillin,	NYC https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2F5.Let%20Me%20Have%20This.jpg?alt=media&token=aac2d044-02e0-4bc7-9977-13b10c398954 
Song	THISMINORITY	Dangerous Satisfaction	https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2Fsongs%2FFreshisui%20-%20Dangerous%20Satisfaction.mp3?alt=media&token=2161f557-ceef-44a7-be1a-d261881666ce	.04 ETH (~$107)	/ 100	20% off live shows	HipHop,	NYC https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2F6.Dangerous%20Satisfaction.jpg?alt=media&token=072f2623-4e42-4737-b93c-27d640488f65 
Song	THISMINORITY	Sun Down	https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2Fsongs%2FSun%20Down.mp3?alt=media&token=985ee41b-c93d-474b-a1ba-7933989b1f8d	.04 ETH (~$107)	/ 100	20% off live shows	HipHop,	NYC https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2F7.Sun%20Down.jpg?alt=media&token=02523ade-3100-47f2-ad6f-e6daf5cf21bb 


Song	THISMINORITY	BTWD	https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2Fsongs%2FBTWD.mp3?alt=media&token=f96b4376-bb3b-4e6f-91c8-1342a0c11884
.04 ETH (~$107)	/ 100	20% off live shows	HipHop,	NYC https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2F8.BTWD.jpg?alt=media&token=80f29978-a7f4-48d4-a6ce-a8e9807383e2 
Song	THISMINORITY	CHK	https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2Fsongs%2FCasada%20Jones%20-%20CHK.mp3?alt=media&token=ff3c7075-7f89-4817-a381-381aae3cb991	.04 ETH (~$107)	/ 100	20% off live shows	HipHop,	NYC https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2F9.CHK.jpg?alt=media&token=da84efe1-a5cf-476c-a774-66c102d50852
Song	THISMINORITY	STING	https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2Fsongs%2FCasada%20Jones%20-%20NCPS.mp3?alt=media&token=7a38b8d6-54b2-43c3-9e78-edc0319cb897	.04 ETH (~$107)	/ 100	20% off live shows	HipHop,	NYC https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2F10.NCPS.jpg?alt=media&token=38a875a4-a0e1-40f8-8761-94ea85cd7aac 

Song	THISMINORITY	NCPS	https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2Fsongs%2FCasada%20Jones%20-%20NCPS.mp3?alt=media&token=7a38b8d6-54b2-43c3-9e78-edc0319cb897	.04 ETH (~$107)	/ 100	20% off live shows	HipHop,	NYC https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2F11.NCPS.jpg?alt=media&token=7832b8a0-c7e9-4721-a84a-3daea53d8c0e 
Song	THISMINORITY	EBT	https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2Fsongs%2FEBT.mp3?alt=media&token=08f86c84-b6d5-4665-9c50-559ad2e42c37	.04 ETH (~$107)	/ 100	20% off live shows	HipHop,	NYC https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2F12.EBT.jpg?alt=media&token=10317014-01ac-4a70-ac75-541ef94b7bbe 
Song	THISMINORITY	MEDI	https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2Fsongs%2FMEDI.mp3?alt=media&token=2a6a3683-e05d-47cd-b7a1-d9f194217d3a	.04 ETH (~$107)	/ 100	20% off live shows	HipHop,	NYC https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2F13.MEDI.jpg?alt=media&token=4c34407e-3679-4278-80f0-da81f2f3f7fc 

Song	THISMINORITY	SORRY	https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2Fsongs%2FCasada%20Jones%20-%20SORRY.mp3?alt=media&token=ae4b6478-e683-43d2-ad34-6e06eb8c3268	.04 ETH (~$107)	/ 100	20% off live shows	HipHop,	NYC https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2F14.SORRY.jpg?alt=media&token=2f6e5c0f-2027-4e37-bdef-c56a25c659c8

Song	THISMINORITY	SUNNY BEACHES	https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2Fsongs%2FProd.%20Riddiman%2C%20Indig0%20-%20SUNNY%20BEACHES.mp3?alt=media&token=a8dac038-18d0-4645-81fb-928752172d05	.04 ETH (~$107)	/ 100	20% off live shows	HipHop,	NYC https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2F15.SUNNY%20BEACHES.jpg?alt=media&token=5be7b253-e9ed-46ea-80f3-55544f1c78bc

Song	THISMINORITY	JUST ME	https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2Fsongs%2FProd.%20Riddiman%20-%20JUST%20ME.mp3?alt=media&token=3259c80a-beba-4f35-85e2-9acf5274dbbe 	.04 ETH (~$107)	/ 100	20% off live shows	HipHop,	NYC https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2F16.JUST%20ME.jpg?alt=media&token=fa738e19-9391-4f28-bcd2-be05255d94d7
Song	THISMINORITY	LOVE	https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2Fsongs%2FCaptain%20Lo-Fi%20-%20LOVE.mp3?alt=media&token=543ee587-ccc1-4391-8926-f783cacb7ed2	.04 ETH (~$107)	/ 100	20% off live shows	HipHop,	NYChttps://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2F17.LOVE.jpg?alt=media&token=c556be6f-5920-40d1-9f1a-18484e5a081c
Song	THISMINORITY	SHINE	https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2Fsongs%2FFreshisui%20-%20SHINE.mp3?alt=media&token=8a552426-54c0-4da0-b349-63333f7e4146	.04 ETH (~$107)	/ 100	20% off live shows	HipHop,	NYC
https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/Mike%20Bellamy%20Music%2F18.SHINE.jpg?alt=media&token=8e37823f-1f69-4fe8-8e89-e2b28db216fa





