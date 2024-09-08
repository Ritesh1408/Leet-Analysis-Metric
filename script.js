document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("search-btn");
    const usernameinput = document.getElementById("username");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-card"); 

    function validateUsername(username) {
        if (username.trim() === "") {
            alert("Username cannot be empty");
            return false;
        }

        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if (!isMatching) {
            alert("Invalid username");
        }
        return isMatching;
    }

    async function fetchUserDetails(username) {
        try {
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;
    
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const targetUrl = 'https://leetcode.com/graphql/';
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
    
            const graphql = JSON.stringify({
                query: `
                    query userSessionProgress($username: String!) {
                        allQuestionsCount {
                            difficulty
                            count
                        }
                        matchedUser(username: $username) {
                            submitStats {
                                acSubmissionNum {
                                    difficulty
                                    count
                                    submissions
                                }
                                totalSubmissionNum {
                                    difficulty
                                    count
                                    submissions
                                }
                            }
                        }
                    }
                `,
                variables: { "username": `${username}` }
            });
    
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: graphql,
                redirect: "follow"
            };
            
            const response = await fetch(proxyUrl + targetUrl, requestOptions);
            const data = await response.json();
    
            console.log("Response Data: ", data);
    
            if (!data || !data.data || !data.data.matchedUser) {
                console.error("Invalid data structure: ", data);
                throw new Error("No user data available");
            }
    
            const userStats = data.data.matchedUser.submitStats.acSubmissionNum;
            const questionCounts = data.data.allQuestionsCount;  // Get question counts
            console.log("User Stats: ", userStats);
            displayUserStats(userStats, questionCounts);  // Pass question counts for total questions
    
    
        } catch (error) {
            console.error("Error fetching user details:", error);
            statsContainer.innerHTML = `<p>${error.message}</p>`;
        } finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    function updateProgress(solved, total, label, circle) {
        const percentage = (solved / total) * 100;
        circle.style.background = `conic-gradient(#70db70 ${percentage}%, #2d3740 ${percentage}% 100%)`;
        label.textContent = `${solved} / ${total}`;
    }

    function displayUserStats(userStats, questionCounts) {
        // Extracting total questions by difficulty
        const totalEasyQues = questionCounts.find(q => q.difficulty === "Easy").count;
        const totalMediumQues = questionCounts.find(q => q.difficulty === "Medium").count;
        const totalHardQues = questionCounts.find(q => q.difficulty === "Hard").count;

        // Extracting solved questions by difficulty
        const solvedTotalEasyQues = userStats.find(q => q.difficulty === "Easy").count;
        const solvedTotalMediumQues = userStats.find(q => q.difficulty === "Medium").count;
        const solvedTotalHardQues = userStats.find(q => q.difficulty === "Hard").count;

        // Updating progress circles
        updateProgress(solvedTotalEasyQues, totalEasyQues, easyLabel, easyProgressCircle);
        updateProgress(solvedTotalMediumQues, totalMediumQues, mediumLabel, mediumProgressCircle);
        updateProgress(solvedTotalHardQues, totalHardQues, hardLabel, hardProgressCircle);

        // Calculate total submissions
        const totalSubmissions = userStats.reduce((acc, curr) => acc + curr.submissions, 0);
        const easySubmissions = userStats.find(q => q.difficulty === "Easy").submissions;
        const mediumSubmissions = userStats.find(q => q.difficulty === "Medium").submissions;
        const hardSubmissions = userStats.find(q => q.difficulty === "Hard").submissions;

        // Creating cardsData array for display
        const cardsData = [
            { label: "Total Submissions", solved: totalSubmissions },
            { label: "Easy Submissions", solved: easySubmissions },
            { label: "Medium Submissions", solved: mediumSubmissions },
            { label: "Hard Submissions", solved: hardSubmissions }
        ];

        console.log("Card Data: ", cardsData);

        cardStatsContainer.innerHTML = cardsData.map(data => {
            return `
                <div class="stats-card-item">
                    <h4>${data.label}</h4>
                    <p>${data.solved} </p>
                </div>
            `;
        }).join("");
    }

    searchButton.addEventListener("click", function() {
        const username = usernameinput.value;
        console.log("Logged In User: ", username);
        if (validateUsername(username)) {
            fetchUserDetails(username);
        }
    });
});





/**
 * 
 * const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
 * 
 * searchButton.textContent = "Searching...";
            searchButton.disabled = true;
            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Failed to fetch data");
            }
            const data = await response.text();
            console.log("Logging data : ",data);
 * 
 */

