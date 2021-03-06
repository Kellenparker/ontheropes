import { Button, ButtonGroup, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/KeyboardArrowDown";
import React from "react";
import { Link } from "react-router-dom";
import "./styles/Header.css";
import { init } from "../index";

const Header = () => {
    return (
        <div className="header">
            <Link to="/" className="title">
                On the Ropes
            </Link>
            <ButtonGroup color="inherit" variant="contained" className="btnGroup">
                <Button color="inherit" className="headButton">
                    Champions
                </Button>
                <Button color="inherit" className="headButton">
                    Top Fighters
                </Button>
                <Button color="inherit" className="headButton">
                    Upcoming Cards
                </Button>
                <Button color="inherit" className="headButton">
                    Hall of Fame
                </Button>
            </ButtonGroup>
            <OptionMenu/>
        </div>
    );
};

function OptionMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
	const handleReset = () => {
		init(true);
	}

    return (
        <div className="opt">
            <IconButton
				aria-label="more"
				id="long-button"
				aria-controls={open ? 'long-menu' : undefined}
				aria-expanded={open ? 'true' : undefined}
				aria-haspopup="true"
				onClick={handleClick}
			>
				<MoreVertIcon />
			</IconButton>
            <Menu
                id="demo-customized-menu"
                MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
				<Link to="/" style={{
					color: 'inherit',
					textDecoration: 'none'
				}}>
					<MenuItem onClick={handleReset} disableRipple>
						Reset
					</MenuItem>
            	</Link>
            </Menu>
        </div>
    );
}

export default Header;
