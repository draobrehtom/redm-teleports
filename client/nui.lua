isNuiShown = false

function openUI()
    SendNUIMessage({
        toggle = true,
    })
    TriggerEvent(GetCurrentResourceName() .. ":onNuiToggle", true)
end

function closeUI()
    SendNUIMessage({
        toggle = false,
    })
    TriggerEvent(GetCurrentResourceName() .. ":onNuiToggle", false)
end

AddEventHandler(GetCurrentResourceName() .. ":onNuiToggle", function(state)
    if state then
        SetNuiFocus(true, true)
        isNuiShown = true
        Citizen.CreateThread(function()
            while isNuiShown do
                Wait(0)
                DisableControlAction(0, 1)
                DisableControlAction(0, 2)
            end
        end)
    else
        SetNuiFocus(false, false)
        isNuiShown = false
    end
end)

RegisterNUICallback('close', function(args, cb)
    closeUI()
    cb(true)
end)