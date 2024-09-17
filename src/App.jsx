import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import UserLayout from "./Layout/UserLayout";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Services from "./Pages/Services/Services";
import PrayerTime from "./Pages/PrayerTime/PrayerTime";
import ContactUs from "./Pages/Contact Us/ContactUs";
import BooksAndGuide from "./Pages/Books And Guide/BooksAndGuide";
import Subject from "./Pages/Books And Guide/Subject/Subject";
import Chapter from "./Pages/Books And Guide/Subject/Chapter/Chapter";
import ViewChapterFile from "./Pages/Books And Guide/Subject/Chapter/ViewChapterFile/ViewChapterFile";
import Live from "./Pages/Live Details/Live";
import Signin from "./Pages/Signin/Signin";
import SignUp from "./Pages/Signup/SignUp";
import EventUpdates from "./Pages/Event Updates/EventUpdates";
import Error from "./Pages/Error/Error";
import AdminLayout from "./Layout/AdminLayout";
import AdminHome from "./Pages/Admin/AdminHome/AdminHome";
import AddPrayerTime from "./Pages/Admin/Add-prayer-time/AddPrayerTime";
import UserDetails from "./Pages/Admin/UserDetails/UserDetails";
import AddLive from "./Pages/Admin/Add Live/AddLive";
import AddEvents from "./Pages/Admin/Add-Events/AddEvents";
import ViewContact from "./Pages/Admin/View-Contact/ViewContact";
import AddStudent from "./Pages/Admin/AddStudent/AddStudent";
import DeleteStudent from "./Pages/Admin/Delete-Student/DeleteStudent";
import AddEducator from "./Pages/Admin/Add-Educator/AddEducator";
import AddBooksAndGuides from "./Pages/Admin/Add-books-and-guide/AddBooksAndGuides";
import Notes from "./Pages/Admin/Add-books-and-guide/Notes/Notes";
import Guide from "./Pages/Admin/Add-books-and-guide/guide/guide";
import ChapterHandling from "./Components/ChapterHandling/ChapterHandling";
import SubjectHandling from "./Components/SubjectHandling/SubjectHandling";
import AddDikrPdf from "./Pages/Admin/Add-Dikr-pdf/AddDikrPdf";
import Dikr from "./Pages/Dikr/Dikr";
import Quran from "./Pages/Quran/Quran";
import Dua from "./Pages/Dua Request/Dua";
import ViewDuas from "./Pages/Admin/View-Duas/ViewDuas";
import ViewDikr from "./Components/View-dikr/ViewDikr";
import VoteType from "./Pages/Vote/VoteType/VoteType";
import Evm from "./Pages/Vote/Evm/Evm";
import VoteList from "./Pages/Admin/Admin-Vote/Vote-list/VoteList";
import AddRepresentative from "./Pages/Admin/Admin-Vote/Add-representatives/AddRepresentative";
import ViewScore from "./Pages/Admin/Admin-Vote/View-Score/ViewScore";
import ScoreBoard from "./Pages/ScoreBoard/ScoreBoard"
import Score from "./Pages/Admin/Score/Score";
import AddScore from "./Pages/Admin/Score/Add-Score/AddScore";
import AddTeam from "./Pages/Admin/Score/Add-Team/AddTeam"
import ChangeScore from "./Pages/Admin/Score/Add-Score/Change-Score/ChangeScore";
function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<UserLayout />}>
                    <Route index element={<Home />} />
                    <Route path="prayer" element={<PrayerTime />} />
                    <Route path="about" element={<About />} />
                    <Route
                        path="services"
                        element={<Services home={false} />}
                    />
                    <Route path="contactus" element={<ContactUs />} />
                    <Route path="booksandguide" element={<BooksAndGuide />} />
                    <Route
                        path="booksandguide/:type/:class"
                        element={<Subject />}
                    />
                    <Route
                        path="booksandguide/:type/:class/:subject"
                        element={<Chapter />}
                    />

                    <Route
                        path="booksandguide/:type/:class/:subject/:chapter"
                        element={<ViewChapterFile />}
                    />
                    <Route path="/live" element={<Live />} />
                    <Route path="/Dikr" element={<Dikr />} />
                    <Route path="/Dikr/:name" element={<ViewDikr />} />
                    <Route path="/dua" element={<Dua />} />
                    <Route path="/Quran" element={<Quran />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/events" element={<EventUpdates />} />
                    <Route path="/vote" element={<VoteType />} />
                    <Route path="/vote/:type" element={<Evm />} />
                    <Route path="/scoreboard" element={<ScoreBoard/>} />
                    <Route path="*" element={<Error />} />
                </Route>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminHome />} />
                    <Route path="add-prayer-time" element={<AddPrayerTime />} />
                    <Route path="users" element={<UserDetails />} />
                    <Route path="add-live" element={<AddLive />} />
                    <Route path="add-events" element={<AddEvents />} />
                    <Route path="view-contact" element={<ViewContact />} />
                    <Route path="view-Duas" element={<ViewDuas />} />
                    <Route path="add-student" element={<AddStudent />} />
                    <Route path="delete-student" element={<DeleteStudent />} />
                    <Route path="add-educator" element={<AddEducator />} />
                    <Route path="dikr-pdf" element={<AddDikrPdf />} />
                    <Route
                        path="add-books-and-guide"
                        element={<AddBooksAndGuides />}
                    />
                    <Route
                        path="add-books-and-guide/notes"
                        element={<Notes />}
                    />
                    <Route
                        path="add-books-and-guide/guides"
                        element={<Guide />}
                    />
                    <Route
                        path="add-books-and-guide/:componentname/addchapter"
                        element={<ChapterHandling />}
                    />
                    <Route
                        path="add-books-and-guide/:componentname/addsubject"
                        element={<SubjectHandling />}
                    />
                    <Route path="vote-list" element={<VoteList />} />
                    <Route
                        path="add-Representative"
                        element={<AddRepresentative />}
                    />
                    <Route path="view-score" element={<ViewScore />} />
                    <Route path="score" element={<Score />} />
                    <Route path="add-team" element={<AddTeam/>} />
                    <Route path="add-score" element={<AddScore />} />
                    <Route path="add-score/change-score/:id/:name/:stagepoint/:offstagepoint" element={<ChangeScore />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
