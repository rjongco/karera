import {
  TableBody,
  TableContainer,
  TablePagination,
  IconButton,
  Box,
  Typography,
  styled,
  Tooltip,
  TableCell,
  TableRow,
  Paper,
} from "@mui/material";
import EnhancedTableHead from "./EnhancedTableHead";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  LOGS_TABLE,
  NOTIFICATION_TABLE,
  REFERRAL_TABLE,
  USER_MANAGEMENT_TABLE,
  TRANSACTIONS_TABLE,
} from "../../constants";
import {
  USER_MANAGEMENT_COLUMN,
  LOGS_COLUMN,
  NOTIFICATION_COLUMN,
  REFERRAL_COLUMN,
  TRANSACTIONS_COLUMN,
} from "../../constants/table";
import {
  TableStyled,
  StyledTableRow,
  StyledCellImage,
  StyledCell,
  StyledCellActions,
} from "./styles";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import {
  getRole,
  getActionStatus,
  getDateActions,
  isEmptyName,
  fullName,
  deactivatedStatus,
} from "../../utils/logic";
import CustomMenu from "../CustomMenu";
import {
  canViewStatusColumn,
  canViewStatusDeactivatedColumn,
  canViewSupervisorApproveAtColumn,
  canViewSupervisorColumn,
  canViewVerifierApproveAtColumn,
  canViewVerifierColumn,
} from "../../utils/permissions/userManagement";
import { AvatarRow } from "./components/AvatarRow";
import LongContentCell from "./components/LongContentCell";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import { GlobalContext } from "../../context/GlobalProvider";
import { parseInt } from "lodash";

type IDataTableProps = {
  rows: any[];
  tableName: string;
  isLoading?: boolean;
  page: number;
  size: number;
  setPage: number;
  setSize: number;
  totalCount: any;
  optionItems: any;
  isMenuOnClose: any;
  filterOnChange?: any;
  filterOnSubmit?: any;
  sortOnSubmit?: any;
  toggleRead?: any;
  amountTotal?: number
};

const StyledCellText = styled(({ label, ...rest }: { label: any }) => (
  <StyledCell {...rest}>{label}</StyledCell>
))(({}) => ({
  maxWidth: "110px",
}));

const StyledCellTextMes = styled(({ label, ...rest }: { label: any }) => (
  <TableCell {...rest}>{label}</TableCell>
))(({}) => ({
  maxWidth: "200px",
  textAlign: "left",
  border: "1px solid #d3d3d3",
}));

const StyledCellTextWithPopper = styled(
  ({ label, ...rest }: { label: any }) => (
    <StyledCell {...rest}>
      {/* @ts-ignore */}
      <Tooltip
        title={label}
        enterDelay={500}
        // @ts-ignore
        interactive
        placement="bottom"
        arrow
      >
        {label}{" "}
      </Tooltip>
    </StyledCell>
  )
)(({}) => ({
  maxWidth: "100px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
}));

const StyledCellFunc = styled(({ label, ...rest }: { label: any }) => (
  <TableCell {...rest}>
    {/* @ts-ignore */}
    <Tooltip
      title={label}
      enterDelay={500}
      // @ts-ignore
      interactive
      placement="bottom"
      arrow
    >
      {label}{" "}
    </Tooltip>
  </TableCell>
))(({}) => ({
  width: "200px",
  textAlign: "center",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  border: "1px solid #d3d3d3",
}));

const StyledCellLogSM = styled(({ label, ...rest }: { label: any }) => (
  <TableCell {...rest}>
    {/* @ts-ignore */}
    <Tooltip
      title={label}
      enterDelay={500}
      // @ts-ignore
      interactive
      placement="bottom"
      arrow
    >
      {label}{" "}
    </Tooltip>
  </TableCell>
))(({}) => ({
  textAlign: "center",
  border: "1px solid #d3d3d3",
}));

export const DataTable: React.FunctionComponent<IDataTableProps> = (props) => {
  const {
    page,
    size,
    setPage,
    setSize,
    totalCount,
    rows,
    tableName,
    isLoading,
    optionItems,
    isMenuOnClose,
    filterOnChange,
    filterOnSubmit,
    sortOnSubmit,
    toggleRead,
    amountTotal
  } = props;
  // const {

  //  @ts-ignore
  const {
    // @ts-ignore
    auth: userInfo,
  } = useContext(GlobalContext);

  const [selected, setSelected] = useState(undefined);
  const [selectedRow, setSelectedRow] = useState(undefined);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (isMenuOnClose) {
      handleClose();
    }
  }, [isMenuOnClose]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onRowClick = (row: any) => {
    setSelectedRow(row);
    //  @ts-ignore
    setSelected((curr: any) => {
      if (row.uuid === curr) {
        return undefined;
      }

      return row.uuid;
    });
  };

  const handleChangePage = (event: any, newPage: any) => {
    //  @ts-ignore
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    //  @ts-ignore
    setSize(+event.target.value);
    //  @ts-ignore
    setPage(0);
  };

  return (
    <>
      {totalCount < 10 ||
        (size > 10 && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalCount || 0}
            // @ts-ignore
            rowsPerPage={size}
            // @ts-ignore
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        ))}
      <TableContainer component={Paper} sx={{ minHeight: "400px" }}>
        <TableStyled aria-labelledby="tableTitle" size="medium">
          {tableName === USER_MANAGEMENT_TABLE && (
            <>
              <EnhancedTableHead
                onSubmit={filterOnSubmit}
                headCells={USER_MANAGEMENT_COLUMN}
              />

              <TableBody>
                {rows.map((row, i) => {
                  return (
                    <StyledTableRow
                      hover
                      onClick={() => onRowClick(row)}
                      key={row.uuid}
                      selected={row.uuid === selected}
                    >
                      {/* PROFILE PICTURE COLUMN */}
                      <StyledCellImage align="left">
                        <AvatarRow
                          profilePicture={row?.profilePicture}
                          id={row.uuid}
                        />
                      </StyledCellImage>

                      {/* FULLNAME COLUMN */}
                      <StyledCellTextWithPopper label={row?.fullName} />

                      {/* MOBILE ELLIPSTS STATUS COLUMN */}
                      <StyledCellTextWithPopper label={row?.mobile} />

                      {/* ROLE COLUMN */}
                      <StyledCellTextWithPopper label={getRole(row?.role)} />

                      {/* ACTION STATUS COLUMN */}
                      {canViewStatusColumn(userInfo.role) && (
                        <StyledCellText
                          label={getActionStatus(row.actionStatus)}
                        />
                      )}

                      {/* verifierWhoApproveName AT STATUS COLUMN */}
                      {canViewVerifierColumn(userInfo.role) && (
                        <StyledCellText
                          label={
                            <>
                              {row?.actionStatus === "approved" &&
                                row?.verifierWhoApproveName}
                              {row?.actionStatus === "deactive" &&
                                row?.personWhoDeactivated}
                              {row?.actionStatus === "forapproval" &&
                                row?.verifierWhoApproveName}
                              {/* {row?.actionStatus === "denied" &&
                                row?.verifierWhoApproveName} */}
                              {row?.actionStatus === "fordeactive" &&
                                row?.isDeactivated &&
                                row?.personWhoDeactivated}
                            </>
                          }
                        />
                      )}

                      {/* supervisorWhoApproveName AT STATUS COLUMN */}
                      {canViewSupervisorColumn(userInfo.role) && (
                        <StyledCellTextWithPopper
                          label={
                            <>
                              {row?.actionStatus === "denied" &&
                                row?.personWhoDeniedName}
                              {row?.actionStatus === "approved" &&
                                row?.supervisorWhoApproveName}
                              {row?.actionStatus === "deactive" &&
                                row?.supervisorWhoApproveName}
                            </>
                          }
                        />
                      )}

                      {/* verifierApprovedAt AT STATUS COLUMN */}
                      {canViewVerifierApproveAtColumn(userInfo.role) && (
                        <StyledCellText
                          label={
                            <>
                              {row?.actionStatus === "approved" &&
                                getDateActions(
                                  row.verifierApprovedAt,
                                  "Not yet approve"
                                )}
                              {row?.actionStatus === "deactive" &&
                                getDateActions(
                                  row.deactivatedAt,
                                  "Not yet deactive"
                                )}

                              {row?.actionStatus === "forapproval" &&
                                getDateActions(
                                  row.verifierApprovedAt,
                                  "Not yet approve"
                                )}
                              {row?.actionStatus === "denied" &&
                                row?.personWhoDeniedRole !== "supervisor" &&
                                getDateActions(row.deniedAt, "Not yet denied")}

                              {row?.actionStatus === "fordeactive" &&
                                row?.isDeactivated &&
                                getDateActions(
                                  row.deactivatedAt,
                                  "Not yet denied"
                                )}
                            </>
                          }
                        />
                      )}

                      {/* supervisorApprovedAt AT STATUS COLUMN */}
                      {canViewSupervisorApproveAtColumn(userInfo.role) && (
                        <StyledCellText
                          label={
                            <>
                              {row?.actionStatus === "approved" &&
                                getDateActions(
                                  row.supervisorApprovedAt,
                                  "Not yet approve"
                                )}
                              {row?.actionStatus === "denied" &&
                                getDateActions(row.deniedAt, "Not yet denied")}

                              {row?.actionStatus === "deactive" &&
                                getDateActions(
                                  row.deactivatedAt,
                                  "Not yet denied"
                                )}
                            </>
                          }
                        />
                      )}

                       {/* ACTION STATUS DEACTIVATED COLUMN */}
                       {canViewStatusDeactivatedColumn(userInfo.role) && (
                        <StyledCellText
                          label={deactivatedStatus(row.status)}
                        />
                      )}


                      {/* CREATED AT STATUS COLUMN */}
                      <StyledCellText
                        label={moment(row.createdAt).format(
                          "YYYY-MM-DD HH:mm:ss"
                        )}
                      />

                      {/* UPDATED AT STATUS COLUMN */}
                      <StyledCellText
                        label={
                          row.updatedAt
                            ? //  @ts-ignore
                              moment(row?.updatedAt).format(
                                "YYYY-MM-DD HH:mm:ss"
                              )
                            : "No yet updated"
                        }
                      />

                      {/* ACTIONS ELLIPSTS STATUS COLUMN */}
                      <StyledCellActions>
                        <IconButton
                          onClick={handleClick}
                          aria-controls="ellipsis-menu"
                          aria-haspopup="true"
                          sx={{ px: "auto", mx: "auto" }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <CustomMenu
                          key={i}
                          anchorEl={anchorEl}
                          items={optionItems}
                          handleClose={handleClose}
                          row={selectedRow}
                        />
                      </StyledCellActions>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </>
          )}

          {tableName === LOGS_TABLE && (
            <>
              <EnhancedTableHead
                onChange={filterOnChange}
                onSubmit={filterOnSubmit}
                headCells={LOGS_COLUMN}
              />
              <TableBody>
                {rows.map((row) => {
                  return (
                    <StyledTableRow
                      hover
                      onClick={() => onRowClick(row)}
                      key={row.uuid}
                      selected={row.uuid === selected}
                    >
                      <StyledCellFunc label={row?.functionality} />
                      <StyledCellTextMes
                        label={
                          <LongContentCell
                            key={row.id}
                            content={row?.message}
                            maxLength={150}
                          />
                        }
                      />
                      <StyledCellLogSM label={row?.level} />
                      <StyledCellLogSM label={row?.associatedId} />
                      <StyledCellLogSM label={row?.associatedType} />
                      <StyledCellText
                        label={moment(row.createdAt).format(
                          "YYYY-MM-DD HH:mm:ss"
                        )}
                      />
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </>
          )}

          {tableName === NOTIFICATION_TABLE && (
            <>
              <EnhancedTableHead
                onChange={filterOnChange}
                onSubmit={filterOnSubmit}
                headCells={NOTIFICATION_COLUMN}
              />
              <TableBody>
                {rows.map((row) => {
                  return (
                    <StyledTableRow
                      hover
                      onClick={() => onRowClick(row)}
                      key={row.id}
                      selected={row.id === selected}
                    >
                      <TableCell sx={{ width: "30px" }}>
                        <div
                          style={{
                            textAlign: "center",
                          }}
                        >
                          {row?.isRead ? (
                            <FiberManualRecordOutlinedIcon
                              style={{ color: "black", fontSize: "10px" }}
                              onClick={() =>
                                toggleRead({ isRead: false, id: row?.id })
                              }
                            />
                          ) : (
                            <FiberManualRecordIcon
                              style={{ color: "black", fontSize: "10px" }}
                              onClick={() =>
                                toggleRead({ isRead: true, id: row?.id })
                              }
                            />
                          )}
                        </div>
                      </TableCell>
                      <StyledCellTextMes
                        label={
                          <LongContentCell
                            key={row.id}
                            content={row?.message}
                            maxLength={350}
                            noLink={false}
                          />
                        }
                      />
                      <StyledCellText label={row?.module} />
                      <StyledCellLogSM label={row?.type} />
                      {/* CREATED AT STATUS COLUMN */}
                      <StyledCellText
                        label={moment(row.createdAt).format(
                          "YYYY-MM-DD HH:mm:ss"
                        )}
                      />

                      {/* UPDATED AT STATUS COLUMN */}
                      <StyledCellText
                        label={
                          row.updatedAt
                            ? //  @ts-ignore
                              moment(row?.updatedAt).format(
                                "YYYY-MM-DD HH:mm:ss"
                              )
                            : "No yet updated"
                        }
                      />
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </>
          )}

          {tableName === REFERRAL_TABLE && (
            <>
              <EnhancedTableHead
                onChange={filterOnChange}
                onSubmit={filterOnSubmit}
                headCells={REFERRAL_COLUMN}
              />
              <TableBody>
                {rows.map((row) => {
                  return (
                    <StyledTableRow
                      hover
                      onClick={() => onRowClick(row)}
                      key={row.id}
                      selected={row.id === selected}
                    >
                      <StyledCellTextWithPopper label={row?.User?.fullName} />
                      <StyledCellTextWithPopper label={row?.User?.role} />
                      <StyledCellTextWithPopper label={row?.User?.mobile} />
                      <StyledCellText label={row?.commission} />

                      <StyledCellText
                        label={moment(row?.createdAt).format(
                          "YYYY-MM-DD HH:mm:ss"
                        )}
                      />

                      <StyledCellText
                        label={
                          row.User?.updatedAt
                            ? //  @ts-ignore
                              moment(row?.User?.updatedAt).format(
                                "YYYY-MM-DD HH:mm:ss"
                              )
                            : "No yet updated"
                        }
                      />
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </>
          )}

          {tableName === TRANSACTIONS_TABLE && (
            <>
              <EnhancedTableHead
                onChange={filterOnChange}
                onSubmit={filterOnSubmit}
                onSubmitSort={sortOnSubmit}
                headCells={TRANSACTIONS_COLUMN}
              />
              <TableBody>
                {rows.map((row) => {
                  return (
                    <StyledTableRow
                      hover
                      onClick={() => onRowClick(row)}
                      key={row.id}
                      selected={row.id === selected}
                    >
                      <StyledCellTextWithPopper label={row?.transactionId} />
                      <StyledCellTextWithPopper label={row?.callbackId} />
                      <StyledCellText
                        label={moment(row?.createdAt).format(
                          "YYYY-MM-DD HH:mm:ss"
                        )}
                      />

                      <StyledCellTextWithPopper label={row?.type} />

                      <StyledCellTextWithPopper label={parseInt(row?.amount).toFixed(2)} />

                      <StyledCellTextWithPopper label={row?.status} />

                      <StyledCellTextWithPopper label={row?.playerName} />

                      <StyledCellTextWithPopper label={row?.game_id} />
                    </StyledTableRow>
                  );
                })}
                <TableRow>
                  <StyledCell colSpan={4} sx={{textAlign:"left", fontWeight:600 }} >Total</StyledCell>
                  <StyledCellTextWithPopper label={amountTotal} />
                  <TableCell colSpan={3} />
                </TableRow>
              </TableBody>
            </>
          )}

          {totalCount === 0 && (
            <Box>
              <Typography>No Data Available</Typography>
            </Box>
          )}

          {isLoading && (
            <Box>
              <Typography>Loading...</Typography>
            </Box>
          )}
        </TableStyled>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount || 0}
        rowsPerPage={size}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default DataTable;
