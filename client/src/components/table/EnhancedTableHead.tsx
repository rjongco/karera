import {
  Grid,
  IconButton,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  styled,
} from "@mui/material";
import { TableColumn } from "../../types";
import { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { GlobalContext } from "../../context/GlobalProvider";
import dayjs from "dayjs";
import { SortIcon } from "./components/SortIcon";
import { FilterFields } from "./components/FilterFields";

type IEnhancedTableHeadProps = {
  headCells: TableColumn[];
  onSubmit?: any;
  onSubmitSort?: any;
  onChange?: any;
};

const StyledCellDiv = styled("div")(({ theme }) => ({
  maxWidth: "120px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  textAlign: "center",
  margin: "0 auto",
  fontWeight: 600,
  [theme.breakpoints.only("xs")]: {
    maxWidth: "50px",
  },
}));

const StyledCell = styled(TableCell)(() => ({
  maxWidth: "100px",
  textAlign: "center",
  border: "1px solid #d3d3d3",
}));

export const EnhancedTableHead: React.FunctionComponent<
  IEnhancedTableHeadProps
> = (props) => {
  const { headCells, onSubmit, onChange, onSubmitSort } = props;

  const initialRangeDate = [
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ];
  const [rangeDate, setRangeDate]: any = useState(initialRangeDate);
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("23:59");

  const handleChangeStartTime = (value: any) => {
    setStartTime(value);
  };

  const handleChangeEndTime = (value: any) => {
    setEndTime(value);
  };

  //  @ts-ignore
  //  @ts-ignore
  const {
    // @ts-ignore
    auth: userInfo,
  } = useContext(GlobalContext);

  const initialFormData = headCells.reduce((acc: any, column: any) => {
    acc[column.id] = "";
    return acc;
  }, {});

  const [openFields, setOpenFields] = useState<{ [key: string]: boolean }>({});
  // const [sortFields, setSortFields] = useState<{ [key: string]: boolean }>({});
  const [sortFields, setSortFields] = useState<{
    [key: string]: "ASC" | "DESC";
  }>({});
  const [values, setValues] = useState({});

  useEffect(() => {
    setValues(initialFormData);
  }, []);

  // const handleSortToggle = (fieldName: string | number) => {
  //   setSortFields((prevSortFields: any) => {
  //     const currentSortOrder = prevSortFields[fieldName];
  //     const nextSortOrder = currentSortOrder === "DESC" ? "ASC" : "DESC"; // Toggle sorting order
  //     const updatedValues = {
  //       ...prevSortFields,
  //       [fieldName]: nextSortOrder,
  //     };
  //     onSubmitSort(updatedValues);
  //     return updatedValues; // Return the updated state
  //   });
  // };

  const handleSortToggle = (fieldName: string) => {
    // @ts-ignore
    setSortFields((prevSortFields) => {
      const currentSortOrder = prevSortFields[fieldName];
      const nextSortOrder = currentSortOrder === "DESC" ? "ASC" : "DESC";
      const updatedValues = {
        [fieldName]: nextSortOrder,
      };
      onSubmitSort(updatedValues);
      return updatedValues; // Return only the updated state for the specific field
    });
  };

  const handleFieldToggle = (fieldName: string) => {
    setOpenFields((prevOpenFields) => ({
      ...prevOpenFields,
      [fieldName]: !prevOpenFields[fieldName], // Toggle the open/close state
    }));
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputSubmit = (values: any) => {
    onSubmit(values);
  };

  const clearFieldValue = (fieldName: any) => {
    setOpenFields((prevOpenFields) => ({
      ...prevOpenFields,
      [fieldName]: !prevOpenFields[fieldName], // Toggle the open/close state
    }));
    setValues((prevValues) => ({
      ...prevValues,
      [fieldName]: "", // Clear the value of the specific field
    }));
    setValues((prevValues) => {
      const updatedValues = {
        ...prevValues,
        [fieldName]: "", // Clear the value of the specific field
      };
      onSubmit(updatedValues);
      return updatedValues; // Return the updated state
    });
  };

  const handleCloseRangeDate = (fieldName: any) => {
    setOpenFields((prevOpenFields) => ({
      ...prevOpenFields,
      [fieldName]: !prevOpenFields[fieldName], // Toggle the open/close state
    }));

    // const newStartDate = dayjs(rangeDate.startDate).format("YYYY-MM-DD");
    // const newEndDate = dayjs(rangeDate.endDate).format("YYYY-MM-DD");
    // const newStartDateTime = `${newStartDate} ${startTime}:00`;
    // const newEndDateTime = `${newEndDate} ${endTime}:59`;

    // setValues((prevValues) => {
    //   const updatedValues = {
    //     ...prevValues,
    //     [fieldName]: `${newStartDateTime},${newEndDateTime}`,
    //   };
    //   onSubmit(updatedValues);
    // });
  };

  const handleChangeRangeDate = (item: any, name: any) => {
    const newRangeDate = [item.selection];
    setRangeDate(newRangeDate);
    const newStartDate = dayjs(item.selection.startDate).format("YYYY-MM-DD");
    const newEndDate = item.selection.endDate
      ? dayjs(item.selection.endDate).format("YYYY-MM-DD")
      : null;
    const newStartDateTime = `${newStartDate} ${startTime}:00`;
    const newEndDateTime = `${newEndDate} ${endTime}:59`;

    setValues((prevValues) => {
      const updatedValues = {
        ...prevValues,
        [name]: `${newStartDateTime},${newEndDateTime}`,
      };
      onSubmit(updatedValues);
      return updatedValues; // Return the updated state
    });
  };

  return (
    <TableHead>
      <TableRow>
        {headCells
          .filter((headCell) => {
            if (headCell?.role) {
              return !headCell.role.includes(userInfo?.role);
            }
            return true;
          })
          .map((headCell) => {
            const isInputFiltering = openFields[headCell.id] && headCell.filter;
            const isSortingFiltering =
              headCell?.filter && !openFields[headCell.id];
            return (
              <StyledCell key={headCell?.id} align="center">
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  sx={{ width: "100%" }}
                  spacing={0}
                >
                  <Grid
                    // @ts-ignore
                    xs={openFields[headCell.id] && headCell?.filter ? 12 : 0}
                    item
                  >
                    <Grid
                      container
                      sx={{ width: "100%", position: "relative" }}
                    >
                      {/* @ts-ignore */}
                      {isInputFiltering ? (
                        <FilterFields
                          headCell={headCell}
                          values={values}
                          handleInputChange={handleInputChange}
                          handleInputSubmit={handleInputSubmit}
                          clearFieldValue={clearFieldValue}
                          handleCloseRangeDate={handleCloseRangeDate}
                          handleChangeRangeDate={handleChangeRangeDate}
                          rangeDate={rangeDate}
                          handleChangeStartTime={handleChangeStartTime}
                          handleChangeEndTime={handleChangeEndTime}
                          startTime={startTime}
                          endTime={endTime}
                        />
                      ) : (
                        <Grid justifyContent="flex-end">
                          <Tooltip
                            title={headCell.label}
                            enterDelay={500}
                            // @ts-ignore
                            interactive
                          >
                            <StyledCellDiv>{headCell.label}</StyledCellDiv>
                          </Tooltip>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                  {/*  @ts-ignore */}
                  {isSortingFiltering && (
                    <Grid item>
                      <Grid container justifyContent="flex-start">
                        <IconButton
                          aria-label="delete"
                          //  @ts-ignore
                          onClick={() => handleFieldToggle(headCell?.id)}
                          sx={{ m: "0 5px", p: 0 }}
                        >
                          <SearchIcon sx={{ fontSize: "16px", mt: "2px" }} />
                        </IconButton>
                      </Grid>
                    </Grid>
                  )}
                  {headCell?.sort && !isInputFiltering && (
                    <SortIcon
                      headCell={headCell}
                      sortFields={sortFields}
                      handleSortToggle={handleSortToggle}
                    />
                  )}
                </Grid>
              </StyledCell>
            );
          })}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
