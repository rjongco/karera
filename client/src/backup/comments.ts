// I BACKUP THIS IF I NEEDED TO APPLY THIS STYLE FOR REGISTRATION PAGE

/* const WhiteBorderDateField = styled(DateField)`
  & input {
    color: white;
  }
  & label {
    color: white;
  }
  & label.Mui-focused {
    color: white;
  }

  & .MuiOutlinedInput-root {
    border-color: white;
    &.Mui-focused fieldset {
      border-color: white;
    }
  }
`; */

/*const WhiteBorderTextField = styled(TextField)`
  & input {
    color: white;
  }
  & label {
    color: white;
  }
  & label.Mui-focused {
    color: white;
  }

  & .MuiOutlinedInput-root {
    border-color: white;
    &.Mui-focused fieldset {
      border-color: white;
    }
  }
`;
*/

/* REDUCER FOR LOGIN
  // @ts-ignore
  login: (data) => async (dispatch) => {
    dispatch({ type: API_PENDING });
    try {
      // @ts-ignore
      await loginAPI(data).then((response) => {
        if (!response) {
          dispatch({ type: API_FAILURE, message: "No response", payload: {} });
        } else {
          dispatch({
            type: API_SUCCESS,
            message: response.message,
            payload: { data: response.data, message: response.message },
          });
        }
      });
    } catch (error) {
      // @ts-ignore
      if (error.type === VALIDATION_ERROR) {
        // @ts-ignore
        const message = error.message;
        dispatch({
          type: API_FAILURE,
          message: message,
          payload: { type: API_FAILURE, message },
        });
      }
    }
  },
*/

// useEffect(() => {
//   if (authState) {
//     console.log("~~", authState);
//   }
// }, [authState]);

/* SIDEBAR
/*
  {items && (
        //  @ts-ignore
        <Collapse in={open} timeout="auto" unmountOnExit>
   
          <List component="div" disablePadding>
            {items.map(
              (
                {
                  //  @ts-ignore
                  label,
                  //  @ts-ignore
                  icon: IconComponent,
                  //  @ts-ignore
                  items,
                  //  @ts-ignore
                  sideBarName: sideBarName1,
                  link,
                },
                index
              ) => {
                const openItemsSubVar = includes(openItemsSub, index);
                // const active = pathname === link;
                const searchIndex2 = findIndex(
                  sidebarItems[searchIndex].items,
                  //  @ts-ignore
                  (obj) => obj.label === sideBarName1
                );
                const active =
                  sidebarItems[searchIndex].items[searchIndex2].active;

                return (
                  <div key={label}>
                    <LightTooltip
                      disableHoverListener={openSideBar}
                      key={label}
                      title={label}
                      placement="right"
                      arrow
                    >
                      <ListItem
                        className="firstSideBar"
                        sx={[
                          listItemStyles,
                          active && isActiveListItemStyle,
                          { pl: 3 },
                        ]}
                        onClick={() =>
                          onItemClickSub(
                            [sideBarName0, sideBarName1],
                            link,
                            index
                          )
                        }
                        // component={!items ?  Link : ListItem}
                        component={ListItem}
                        // to={link || '#'}
                      >
                        <ListItemIcon>
                          <IconComponent
                            className="renderIcons"
                            sx={{ color: "white" }}
                          />
                        </ListItemIcon>
                        <ListItemText primary={label} />
                        {items &&
                          (openItemsSubVar ? (
                            <ExpandLess
                              className="dropDownIcons"
                              sx={{ color: "white" }}
                            />
                          ) : (
                            <ExpandMore
                              className="dropDownIcons"
                              sx={{ color: "white" }}
                            />
                          ))}
                      </ListItem>
                    </LightTooltip>
                    {items && (
                      <Collapse in={active} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {items.map(
                            ({
                              //  @ts-ignore
                              label,
                              //  @ts-ignore
                              icon: IconComponent,
                              //  @ts-ignore
                              link,
                              //  @ts-ignore
                              sideBarName: sideBarName2,
                            }) => {
                              const searchIndex3 = findIndex(
                                sidebarItems[searchIndex].items[searchIndex2]
                                  .items,
                                //  @ts-ignore
                                (obj) => obj.label === sideBarName2
                              );
                              const active =
                                sidebarItems[searchIndex].items[searchIndex2]
                                  .items[searchIndex3].active;
                              // const active = pathname === link;

                              return (
                                //  @ts-ignore
                                <LightTooltip
                                  disableHoverListener={openSideBar}
                                  key={label}
                                  title={label}
                                  placement="right"
                                  arrow
                                >
                                  <ListItem
                                    className="firstSideBar"
                                    component={ListItem}
                                    // to={link || '#'}
                                    sx={[
                                      listItemStyles,
                                      active && isActiveListItemStyle,
                                      { pl: openSideBar ? 5 : 3 },
                                    ]}
                                    onClick={() =>
                                      handleSetActiveSidebar(
                                        [
                                          sideBarName0,
                                          sideBarName1,
                                          sideBarName2,
                                        ],
                                        link
                                      )
                                    }
                                  >
                                    <ListItemIcon>
                                      <IconComponent
                                        className="renderIcons"
                                        sx={{ color: "white" }}
                                      />
                                    </ListItemIcon>
                                    <ListItemText primary={label} />
                                  </ListItem>
                                </LightTooltip>
                              );
                            }
                          )}
                        </List>
                      </Collapse>
                    )}
                  </div>
                );
              }
            )}
          </List>
        </Collapse>
      )}

    const onItemClickSub = (arrays, link, index) => {
      handleSetActiveSidebar(arrays, link);
      const pointerIndex = findIndex(openItemsSub, (item) => item === index);
      if (pointerIndex >= 0) {
        setOpenItemsSub([
          ...openItemsSub.slice(0, pointerIndex),
          ...openItemsSub.slice(pointerIndex + 1),
        ]);
      } else {
        setOpenItemsSub([...openItemsSub, index]);
      }
    };
    const handleSetActiveSidebar = (columnName, link) => {
        setSidebarItems(columnName);
        if (link) {
          if (link == "/maintenance") {
            navigate(`/user-management`);
          } else {
            navigate(`${link}`);
          }
        }
    };

    const isActiveListItemStyle = {
      borderLeft: "3px solid #ffffff",
      backgroundColor: "#ffffff",
      "& .MuiListItemText-primary": {
        color: "black",
        fontWeight: "600 !important",
      },
      "& .dropDownIcons": {
        color: "black",
      },
      "& .renderIcons": {
        color: "black",
      },
    };

    
    const List = styled(MuiList)({
      "& .MuiListItemButton-root": {
        paddingTop: 1,
        paddingBottom: 1,
      },
    });

     const [openItemsSub, setOpenItemsSub] = useState([0]);

    END OF SIDEBAR
*/
