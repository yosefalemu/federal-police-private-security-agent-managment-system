import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import EditEmployeeModal from "./EditEmployeeModal";
import DeleteEmployeeModal from "./DeleteEmployeeModal";
import DetailEmployeeModal from "./DetailEmployeeModal";
import React, { useState } from "react";

const EmployeeList = () => {
  const [detailModal, setDetailModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  return (
    <Box>
      <TableContainer component={Paper} sx={{ bgcolor: "#f7f7f7" }}>
        <Table>
          <TableHead sx={{ background: "#bbb", color: "#fff" }}>
            <TableRow>
              <TableCell
                sx={{
                  color: "#112846",
                  display: { xs: "none", sm: "table-cell" },
                  width: "12%",
                }}
              >
                Agent Name
              </TableCell>
              <TableCell
                sx={{
                  color: "#112846",
                  display: { xs: "none", md: "table-cell" },
                  width: "12%",
                }}
              >
                Manager Name
              </TableCell>
              <TableCell sx={{ color: "#112846", width: "12%" }}>
                Email
              </TableCell>
              <TableCell
                sx={{
                  color: "#112846",
                  display: { xs: "none", lg: "table-cell" },
                  width: "12%",
                }}
              >
                Phone Number
              </TableCell>
              <TableCell
                sx={{
                  color: "#112846",
                  display: { xs: "none", lg: "table-cell" },
                  width: "12%",
                }}
              >
                Address
              </TableCell>
              <TableCell
                sx={{
                  color: "#112846",
                  display: { xs: "none", lg: "table-cell" },
                  width: "12%",
                }}
              >
                Employees Num
              </TableCell>
              <TableCell sx={{ color: "#112846", width: "3%" }}>Edit</TableCell>
              <TableCell sx={{ color: "#112846", width: "3%" }}>
                Details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                sx={{
                  display: { xs: "none", sm: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", md: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell>test</TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell sx={{ width: "3%" }}>
                <IconButton
                  sx={{ color: "#EF9630" }}
                  onClick={() => setEditModal(true)}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>

              <TableCell sx={{ width: "3%" }}>
                <IconButton
                  sx={{ color: "blue" }}
                  onClick={() => setDetailModal(true)}
                >
                  <SettingsAccessibilityIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell
                sx={{
                  display: { xs: "none", sm: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", md: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell>test</TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell sx={{ width: "3%" }}>
                <IconButton
                  sx={{ color: "#EF9630" }}
                  onClick={() => setEditModal(true)}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>

              <TableCell sx={{ width: "3%" }}>
                <IconButton
                  sx={{ color: "blue" }}
                  onClick={() => setDetailModal(true)}
                >
                  <SettingsAccessibilityIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell
                sx={{
                  display: { xs: "none", sm: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", md: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell>test</TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell sx={{ width: "3%" }}>
                <IconButton
                  sx={{ color: "#EF9630" }}
                  onClick={() => setEditModal(true)}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>

              <TableCell sx={{ width: "3%" }}>
                <IconButton
                  sx={{ color: "blue" }}
                  onClick={() => setDetailModal(true)}
                >
                  <SettingsAccessibilityIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell
                sx={{
                  display: { xs: "none", sm: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", md: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell>test</TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell sx={{ width: "3%" }}>
                <IconButton
                  sx={{ color: "#EF9630" }}
                  onClick={() => setEditModal(true)}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>

              <TableCell sx={{ width: "3%" }}>
                <IconButton
                  sx={{ color: "blue" }}
                  onClick={() => setDetailModal(true)}
                >
                  <SettingsAccessibilityIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell
                sx={{
                  display: { xs: "none", sm: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", md: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell>test</TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell sx={{ width: "3%" }}>
                <IconButton
                  sx={{ color: "#EF9630" }}
                  onClick={() => setEditModal(true)}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>

              <TableCell sx={{ width: "3%" }}>
                <IconButton
                  sx={{ color: "blue" }}
                  onClick={() => setDetailModal(true)}
                >
                  <SettingsAccessibilityIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell
                sx={{
                  display: { xs: "none", sm: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", md: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell>test</TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell sx={{ width: "3%" }}>
                <IconButton
                  sx={{ color: "#EF9630" }}
                  onClick={() => setEditModal(true)}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>

              <TableCell sx={{ width: "3%" }}>
                <IconButton
                  sx={{ color: "blue" }}
                  onClick={() => setDetailModal(true)}
                >
                  <SettingsAccessibilityIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell
                sx={{
                  display: { xs: "none", sm: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", md: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell>test</TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell sx={{ width: "3%" }}>
                <IconButton
                  sx={{ color: "#EF9630" }}
                  onClick={() => setEditModal(true)}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>

              <TableCell sx={{ width: "3%" }}>
                <IconButton
                  sx={{ color: "blue" }}
                  onClick={() => setDetailModal(true)}
                >
                  <SettingsAccessibilityIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell
                sx={{
                  display: { xs: "none", sm: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", md: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell>test</TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell sx={{ width: "3%" }}>
                <IconButton
                  sx={{ color: "#EF9630" }}
                  onClick={() => setEditModal(true)}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>

              <TableCell sx={{ width: "3%" }}>
                <IconButton
                  sx={{ color: "blue" }}
                  onClick={() => setDetailModal(true)}
                >
                  <SettingsAccessibilityIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell
                sx={{
                  display: { xs: "none", sm: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", md: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell>test</TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                  width: "12%",
                }}
              >
                test
              </TableCell>
              <TableCell sx={{ width: "3%" }}>
                <IconButton
                  sx={{ color: "#EF9630" }}
                  onClick={() => setEditModal(true)}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>

              <TableCell sx={{ width: "3%" }}>
                <IconButton
                  sx={{ color: "blue" }}
                  onClick={() => setDetailModal(true)}
                >
                  <SettingsAccessibilityIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <EditEmployeeModal editModal={editModal} setEditModal={setEditModal} />
      <DetailEmployeeModal
        detailModal={detailModal}
        setDetailModal={setDetailModal}
      />
      <DeleteEmployeeModal
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
      />
    </Box>
  );
};

export default EmployeeList;
