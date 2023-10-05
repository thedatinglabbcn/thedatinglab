// import React from "react";
// import { render, fireEvent } from "@testing-library/react";
// import MatchCard from "../components/matchCard/MatchCard";
// import { BrowserRouter as Router } from 'react-router-dom';


// describe("MatchCard Component", () => {
//   it("renders without errors", () => {
//     const { getByText, getByTestId } = render(
//         <Router>
//           <MatchCard />
//         </Router>
//       );
    
//     expect(getByText("¡Tus matches!")).toBeInTheDocument();
//     expect(getByTestId("match-carousel")).toBeInTheDocument();
//   });

//   it("displays 'No matches' message when there are no matching users", () => {
//     const { getByText } = render(<MatchCard />);
    
//     expect(getByText("Sin coincidencias por ahora... ¡Vuelve a comprobarlo más tarde!")).toBeInTheDocument();
//   });

//   it("renders matching users when there are matching users", () => {
//     const matchingUsers = [
//       {
//         id: 1,
//         name: "User1",
//         matchingPercentage: 80,
//         birthdate: "1990-01-01",
//         description: "Description 1",
//         image: "user1.jpg",
//       },
//       {
//         id: 2,
//         name: "User2",
//         matchingPercentage: 70,
//         birthdate: "1995-02-02",
//         description: "Description 2",
//         image: "user2.jpg",
//       },
//     ];

//     const { getByText, getAllByTestId } = render(<MatchCard />);
    
//     expect(getAllByTestId("match-card")).toHaveLength(matchingUsers.length);
//     expect(getByText("User1, 33")).toBeInTheDocument();
//     expect(getByText("User2, 28")).toBeInTheDocument();
//   });

// });