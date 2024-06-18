using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class FixPredictions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_DeliveriesPrediction_StationId",
                table: "DeliveriesPrediction");

            migrationBuilder.CreateIndex(
                name: "IX_DeliveriesPrediction_StationId",
                table: "DeliveriesPrediction",
                column: "StationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_DeliveriesPrediction_StationId",
                table: "DeliveriesPrediction");

            migrationBuilder.CreateIndex(
                name: "IX_DeliveriesPrediction_StationId",
                table: "DeliveriesPrediction",
                column: "StationId",
                unique: true);
        }
    }
}
