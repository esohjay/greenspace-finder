export const thingsToDo = [
  {
    id: "1",
    title: "Have a picnic",
    imgUrl:
      "https://images.pexels.com/photos/5050196/pexels-photo-5050196.jpeg",
    description:
      "Grab your favourite treats and eat them outdoors.There's nothing better than lunch in the open air! Remember to take all your rubbish home with you.",
  },
  {
    id: "2",
    title: "Go Geocache",
    imgUrl:
      "https://images.unsplash.com/photo-1593115590389-076721aa1607?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3870&q=80",
    description:
      "A geocache is typically a small waterproof container with a notebook/piece of paper inside it for finders to sign and date. Sometimes they also contain small trinkets or messages hidden by others - no box is ever the same! Use the Geocaching app to find different geocaching sites near you and discover all sorts of hidden treasures. Once you've reached the location you may need to look hard to find them - many are hidden in trees or between rocks. Don't forget to sign your name and put the date.",
  },
  {
    id: "3",
    title: "Navigate with a map",
    imgUrl:
      "https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Brush up on your map reading skills by setting yourself a challenge to navigate with a map and compass. Start with a simple, local route and once you've built up your confidence then you can go further afield. Navigating with a map is great fun for all the family and you'll get a real sense of achievement finding your way without a phone or GPS. Head over to the GetOutside website to learn how to map read and practice your navigation skills before you set off.",
  },
  {
    id: "4",
    title: "Watch the sunset",
    imgUrl:
      "https://images.pexels.com/photos/165505/pexels-photo-165505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Nothing beats ending your day by watching the sun set. Check what time sunset is and the weather forecast - a clear day is best. If you can, walk up a hill to get the best view and enjoy a picnic as the sun goes down.",
  },
];
export const featureTypes = [
  "Play Space",
  "Bowling Green",
  "Playing Field",
  "Cemetery",
  "Religious Grounds",
  "Tennis Court",
  "Public Park Or Garden",
  "Golf Course",
  "Other Sports Facility",
  "Allotments Or Community Growing Spaces",
];
export const setImgUrl = (featureType: string): string => {
  let imgUrl = "";
  switch (featureType) {
    case "Allotments Or Community Growing Spaces":
      imgUrl =
        "https://cdn.pixabay.com/photo/2010/12/07/08/allotment-1059_1280.jpg";
      break;
    case "Play Space":
      imgUrl =
        "https://cdn.pixabay.com/photo/2016/02/12/14/56/park-1196206_1280.jpg";
      break;
    case "Bowling Green":
      imgUrl =
        "https://cdn.pixabay.com/photo/2010/12/13/10/12/ball-2517_1280.jpg";
      break;
    case "Playing Field":
      imgUrl =
        "https://cdn.pixabay.com/photo/2017/03/19/17/50/guitar-2157112_1280.jpg";
      break;
    case "Cemetery":
      imgUrl =
        "https://cdn.pixabay.com/photo/2017/04/20/15/56/cemetery-2246071_1280.jpg";
      break;
    case "Other Sports Facility":
      imgUrl =
        "https://cdn.pixabay.com/photo/2016/04/15/21/27/out-1331981_1280.jpg";
      break;
    case "Religious Grounds":
      imgUrl =
        "https://cdn.pixabay.com/photo/2020/03/30/17/15/funes-4984899_1280.jpg";
      break;
    case "Tennis Court":
      imgUrl =
        "https://cdn.pixabay.com/photo/2012/12/04/13/05/georgia-68640_1280.jpg";
      break;
    case "Public Park Or Garden":
      imgUrl =
        "https://cdn.pixabay.com/photo/2023/09/18/11/08/bench-8260158_1280.jpg";
      break;
    case "Golf Course":
      imgUrl =
        "https://cdn.pixabay.com/photo/2015/05/28/02/49/golf-787464_1280.jpg";
      break;
  }
  return imgUrl;
};
