document.addEventListener("DOMContentLoaded", () => {
    const leaderboard = document.getElementById("leaderboard");
    const headers = leaderboard.querySelectorAll(".sortable");

    let currentSort = {
        column: null,
        asc: true
    };

    headers.forEach(header => {
        header.addEventListener("click", () => {
            const colIndex = parseInt(header.dataset.col);

            //ordine inverso se si clicca di nuovo
            if (currentSort.column === colIndex) {
                currentSort.asc = !currentSort.asc;
            } else {
                currentSort.column = colIndex;
                currentSort.asc = false; //default: decrescente
            }

            sortLeaderboard(colIndex, currentSort.asc);
        });
    });

    function sortLeaderboard(colIndex, asc) {
        const rows = Array.from(leaderboard.querySelectorAll("li"))
            .slice(1); //esclude header

        rows.sort((a, b) => {
            const aVal = getCellValue(a, colIndex);
            const bVal = getCellValue(b, colIndex);

            if (typeof aVal === "number" && typeof bVal === "number") {
                return asc ? aVal - bVal : bVal - aVal;
            }

            return asc
                ? aVal.localeCompare(bVal)
                : bVal.localeCompare(aVal);
        });

        rows.forEach(row => leaderboard.appendChild(row));
    }

    function getCellValue(row, colIndex) {
        const text = row.children[colIndex].innerText.trim();

        if (text === "N/D") return -1;

        const num = parseInt(text);
        return isNaN(num) ? text : num;
    }
});
